/// <reference types="node" />
import { Manifest } from './manifest';
import { IExtensionsReport } from './publicgalleryapi';
export interface IInMemoryFile {
    path: string;
    mode?: number;
    readonly contents: Buffer | string;
}
export interface ILocalFile {
    path: string;
    mode?: number;
    readonly localPath: string;
}
export declare type IFile = IInMemoryFile | ILocalFile;
export declare function read(file: IFile): Promise<string>;
export interface IPackage {
    manifest: Manifest;
    packagePath: string;
}
export interface IPackageResult extends IPackage {
    files: IFile[];
}
export interface IAsset {
    type: string;
    path: string;
}
export interface IPackageOptions {
    cwd?: string;
    packagePath?: string;
    githubBranch?: string;
    baseContentUrl?: string;
    baseImagesUrl?: string;
    useYarn?: boolean;
    dependencyEntryPoints?: string[];
    ignoreFile?: string;
    expandGitHubIssueLinks?: boolean;
    web?: boolean;
}
export interface IProcessor {
    onFile(file: IFile): Promise<IFile>;
    onEnd(): Promise<void>;
    assets: IAsset[];
    tags: string[];
    vsix: any;
}
export declare class BaseProcessor implements IProcessor {
    protected manifest: Manifest;
    constructor(manifest: Manifest);
    assets: IAsset[];
    tags: string[];
    vsix: any;
    onFile(file: IFile): Promise<IFile>;
    onEnd(): Promise<any>;
}
export declare class TagsProcessor extends BaseProcessor {
    private static Keywords;
    onEnd(): Promise<void>;
}
export declare class MarkdownProcessor extends BaseProcessor {
    private name;
    private regexp;
    private assetType;
    private baseContentUrl;
    private baseImagesUrl;
    private isGitHub;
    private repositoryUrl;
    private expandGitHubIssueLinks;
    constructor(manifest: Manifest, name: string, regexp: RegExp, assetType: string, options?: IPackageOptions);
    onFile(file: IFile): Promise<IFile>;
    private guessBaseUrls;
}
export declare class ReadmeProcessor extends MarkdownProcessor {
    constructor(manifest: Manifest, options?: IPackageOptions);
}
export declare class ChangelogProcessor extends MarkdownProcessor {
    constructor(manifest: Manifest, options?: IPackageOptions);
}
export declare function isSupportedWebExtension(manifest: Manifest, extensionsReport: IExtensionsReport): boolean;
export declare function isWebKind(manifest: Manifest): boolean;
export declare class WebExtensionProcessor extends BaseProcessor {
    private readonly isWebKind;
    constructor(manifest: Manifest, options: IPackageOptions);
    onFile(file: IFile): Promise<IFile>;
    onEnd(): Promise<void>;
}
export declare class NLSProcessor extends BaseProcessor {
    private translations;
    constructor(manifest: Manifest);
    onFile(file: IFile): Promise<IFile>;
}
export declare class ValidationProcessor extends BaseProcessor {
    private files;
    private duplicates;
    onFile(file: IFile): Promise<IFile>;
    onEnd(): Promise<void>;
}
export declare function validateManifest(manifest: Manifest): Manifest;
export declare function readManifest(cwd?: string, nls?: boolean): Promise<Manifest>;
export declare function toVsixManifest(vsix: any): Promise<string>;
export declare function toContentTypes(files: IFile[]): Promise<string>;
export declare function processFiles(processors: IProcessor[], files: IFile[]): Promise<IFile[]>;
export declare function createDefaultProcessors(manifest: Manifest, options?: IPackageOptions): IProcessor[];
export declare function collect(manifest: Manifest, options?: IPackageOptions): Promise<IFile[]>;
export declare function pack(options?: IPackageOptions): Promise<IPackageResult>;
export declare function packageCommand(options?: IPackageOptions): Promise<any>;
/**
 * Lists the files included in the extension's package. Does not run prepublish.
 */
export declare function listFiles(cwd?: string, useYarn?: boolean, packagedDependencies?: string[], ignoreFile?: string): Promise<string[]>;
/**
 * Lists the files included in the extension's package. Runs prepublish.
 */
export declare function ls(cwd?: string, useYarn?: boolean, packagedDependencies?: string[], ignoreFile?: string): Promise<void>;
