export declare function validatePublisher(publisher: string): void;
export declare function validateExtensionName(name: string): void;
export declare function validateVersion(version: string): void;
export declare function validateEngineCompatibility(version: string): void;
/**
 * User shouldn't use a newer version of @types/vscode than the one specified in engines.vscode
 */
export declare function validateVSCodeTypesCompatibility(engineVersion: string, typeVersion: string): void;
