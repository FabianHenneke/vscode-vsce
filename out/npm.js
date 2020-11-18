"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const denodeify = require("denodeify");
const cp = require("child_process");
const parseSemver = require("parse-semver");
const _ = require("lodash");
const util_1 = require("./util");
const stat = denodeify(fs.stat);
const exists = (file) => stat(file).then(_ => true, _ => false);
function parseStdout({ stdout }) {
    return stdout.split(/[\r\n]/).filter(line => !!line)[0];
}
function exec(command, options = {}, cancellationToken) {
    return new Promise((c, e) => {
        let disposeCancellationListener = null;
        const child = cp.exec(command, Object.assign({}, options, { encoding: 'utf8' }), (err, stdout, stderr) => {
            if (disposeCancellationListener) {
                disposeCancellationListener();
                disposeCancellationListener = null;
            }
            if (err) {
                return e(err);
            }
            c({ stdout, stderr });
        });
        if (cancellationToken) {
            disposeCancellationListener = cancellationToken.subscribe(err => {
                child.kill();
                e(err);
            });
        }
    });
}
function checkNPM(cancellationToken) {
    return exec('npm -v', {}, cancellationToken).then(({ stdout }) => {
        const version = stdout.trim();
        if (/^3\.7\.[0123]$/.test(version)) {
            return Promise.reject(`npm@${version} doesn't work with vsce. Please update npm: npm install -g npm`);
        }
    });
}
function getNpmDependencies(cwd) {
    return checkNPM()
        .then(() => exec('npm list --production --parseable --depth=99999 --loglevel=error', { cwd, maxBuffer: 5000 * 1024 }))
        .then(({ stdout }) => stdout.split(/[\r\n]/).filter(dir => path.isAbsolute(dir)));
}
function asYarnDependency(prefix, tree, prune) {
    if (prune && /@[\^~]/.test(tree.name)) {
        return null;
    }
    let name;
    try {
        const parseResult = parseSemver(tree.name);
        name = parseResult.name;
    }
    catch (err) {
        name = tree.name.replace(/^([^@+])@.*$/, '$1');
    }
    const dependencyPath = path.join(prefix, name);
    const children = [];
    for (const child of tree.children || []) {
        const dep = asYarnDependency(path.join(prefix, name, 'node_modules'), child, prune);
        if (dep) {
            children.push(dep);
        }
    }
    return { name, path: dependencyPath, children };
}
function selectYarnDependencies(deps, packagedDependencies) {
    const index = new (class {
        constructor() {
            this.data = Object.create(null);
            for (const dep of deps) {
                if (this.data[dep.name]) {
                    throw Error(`Dependency seen more than once: ${dep.name}`);
                }
                this.data[dep.name] = dep;
            }
        }
        find(name) {
            let result = this.data[name];
            if (!result) {
                throw new Error(`Could not find dependency: ${name}`);
            }
            return result;
        }
    })();
    const reached = new (class {
        constructor() {
            this.values = [];
        }
        add(dep) {
            if (this.values.indexOf(dep) < 0) {
                this.values.push(dep);
                return true;
            }
            return false;
        }
    })();
    const visit = (name) => {
        let dep = index.find(name);
        if (!reached.add(dep)) {
            // already seen -> done
            return;
        }
        for (const child of dep.children) {
            visit(child.name);
        }
    };
    packagedDependencies.forEach(visit);
    return reached.values;
}
function getYarnProductionDependencies(cwd, packagedDependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        const raw = yield new Promise((c, e) => cp.exec('yarn list --prod --json', { cwd, encoding: 'utf8', env: Object.assign({}, process.env), maxBuffer: 5000 * 1024 }, (err, stdout) => (err ? e(err) : c(stdout))));
        const match = /^{"type":"tree".*$/m.exec(raw);
        if (!match || match.length !== 1) {
            throw new Error('Could not parse result of `yarn list --json`');
        }
        const usingPackagedDependencies = Array.isArray(packagedDependencies);
        const trees = JSON.parse(match[0]).data.trees;
        let result = trees
            .map(tree => asYarnDependency(path.join(cwd, 'node_modules'), tree, !usingPackagedDependencies))
            .filter(dep => !!dep);
        if (usingPackagedDependencies) {
            result = selectYarnDependencies(result, packagedDependencies);
        }
        return result;
    });
}
function getYarnDependencies(cwd, packagedDependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [cwd];
        if (yield exists(path.join(cwd, 'yarn.lock'))) {
            const deps = yield getYarnProductionDependencies(cwd, packagedDependencies);
            const flatten = (dep) => {
                result.push(dep.path);
                dep.children.forEach(flatten);
            };
            deps.forEach(flatten);
        }
        return _.uniq(result);
    });
}
function detectYarn(cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const file of ['yarn.lock', '.yarnrc']) {
            if (yield exists(path.join(cwd, file))) {
                if (!process.env['VSCE_TESTS']) {
                    util_1.log.info(`Detected presense of ${file}. Using 'yarn' instead of 'npm' (to override this pass '--no-yarn' on the command line).`);
                }
                return true;
            }
        }
        return false;
    });
}
exports.detectYarn = detectYarn;
function getDependencies(cwd, useYarn, packagedDependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        return (useYarn !== undefined ? useYarn : yield detectYarn(cwd))
            ? yield getYarnDependencies(cwd, packagedDependencies)
            : yield getNpmDependencies(cwd);
    });
}
exports.getDependencies = getDependencies;
function getLatestVersion(name, cancellationToken) {
    return checkNPM(cancellationToken)
        .then(() => exec(`npm show ${name} version`, {}, cancellationToken))
        .then(parseStdout);
}
exports.getLatestVersion = getLatestVersion;
