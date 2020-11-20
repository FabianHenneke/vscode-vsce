"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const validation_1 = require("../validation");
describe('validatePublisher', () => {
    it('should throw with empty', () => {
        assert.throws(() => validation_1.validatePublisher(null));
        assert.throws(() => validation_1.validatePublisher(void 0));
        assert.throws(() => validation_1.validatePublisher(''));
    });
    it('should validate', () => {
        validation_1.validatePublisher('hello');
        validation_1.validatePublisher('Hello');
        validation_1.validatePublisher('HelloWorld');
        validation_1.validatePublisher('Hello-World');
        validation_1.validatePublisher('Hell0-World');
        assert.throws(() => validation_1.validatePublisher('hello.'));
        assert.throws(() => validation_1.validatePublisher('.hello'));
        assert.throws(() => validation_1.validatePublisher('h ello'));
        assert.throws(() => validation_1.validatePublisher('hello world'));
        assert.throws(() => validation_1.validatePublisher('-hello'));
        assert.throws(() => validation_1.validatePublisher('-'));
    });
});
describe('validateExtensionName', () => {
    it('should throw with empty', () => {
        assert.throws(() => validation_1.validateExtensionName(null));
        assert.throws(() => validation_1.validateExtensionName(void 0));
        assert.throws(() => validation_1.validateExtensionName(''));
    });
    it('should validate', () => {
        validation_1.validateExtensionName('hello');
        validation_1.validateExtensionName('Hello');
        validation_1.validateExtensionName('HelloWorld');
        validation_1.validateExtensionName('Hello-World');
        validation_1.validateExtensionName('Hell0-World');
        assert.throws(() => validation_1.validateExtensionName('hello.'));
        assert.throws(() => validation_1.validateExtensionName('.hello'));
        assert.throws(() => validation_1.validateExtensionName('h ello'));
        assert.throws(() => validation_1.validateExtensionName('hello world'));
        assert.throws(() => validation_1.validateExtensionName('-hello'));
        assert.throws(() => validation_1.validateExtensionName('-'));
    });
});
describe('validateVersion', () => {
    it('should throw with empty', () => {
        assert.throws(() => validation_1.validateVersion(null));
        assert.throws(() => validation_1.validateVersion(void 0));
        assert.throws(() => validation_1.validateVersion(''));
    });
    it('should validate', () => {
        validation_1.validateVersion('1.0.0');
        validation_1.validateVersion('0.1.1');
        validation_1.validateVersion('0.1.1-pre');
        assert.throws(() => validation_1.validateVersion('.'));
        assert.throws(() => validation_1.validateVersion('..'));
        assert.throws(() => validation_1.validateVersion('0'));
        assert.throws(() => validation_1.validateVersion('0.1'));
        assert.throws(() => validation_1.validateVersion('.0.1'));
        assert.throws(() => validation_1.validateVersion('0.1.'));
        assert.throws(() => validation_1.validateVersion('0.0.0.1'));
    });
});
describe('validateEngineCompatibility', () => {
    it('should throw with empty', () => {
        assert.throws(() => validation_1.validateEngineCompatibility(null));
        assert.throws(() => validation_1.validateEngineCompatibility(void 0));
        assert.throws(() => validation_1.validateEngineCompatibility(''));
    });
    it('should validate', () => {
        validation_1.validateEngineCompatibility('*');
        validation_1.validateEngineCompatibility('1.0.0');
        validation_1.validateEngineCompatibility('1.0.x');
        validation_1.validateEngineCompatibility('1.x.x');
        validation_1.validateEngineCompatibility('^1.0.0');
        validation_1.validateEngineCompatibility('^1.0.x');
        validation_1.validateEngineCompatibility('^1.x.x');
        validation_1.validateEngineCompatibility('>=1.0.0');
        validation_1.validateEngineCompatibility('>=1.0.x');
        validation_1.validateEngineCompatibility('>=1.x.x');
        assert.throws(() => validation_1.validateVersion('0.0.0.1'));
        assert.throws(() => validation_1.validateVersion('^0.0.0.1'));
        assert.throws(() => validation_1.validateVersion('^1'));
        assert.throws(() => validation_1.validateVersion('^1.0'));
        assert.throws(() => validation_1.validateVersion('>=1'));
        assert.throws(() => validation_1.validateVersion('>=1.0'));
    });
});
describe('validateVSCodeTypesCompatibility', () => {
    it('should validate', () => {
        validation_1.validateVSCodeTypesCompatibility('*', '1.30.0');
        validation_1.validateVSCodeTypesCompatibility('*', '^1.30.0');
        validation_1.validateVSCodeTypesCompatibility('*', '~1.30.0');
        validation_1.validateVSCodeTypesCompatibility('1.30.0', '1.30.0');
        validation_1.validateVSCodeTypesCompatibility('1.30.0', '1.20.0');
        validation_1.validateVSCodeTypesCompatibility('1.46.0', '1.45.1');
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.30.0', '1.40.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.30.0', '^1.40.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.30.0', '~1.40.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.30.0', '1.40.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('^1.30.0', '1.40.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('~1.30.0', '1.40.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.x.x', '1.30.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.x.0', '1.30.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.5.0', '1.30.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.5', '1.30.0'));
        assert.throws(() => validation_1.validateVSCodeTypesCompatibility('1.5', '1.30'));
    });
});
