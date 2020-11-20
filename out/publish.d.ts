export interface IPublishOptions {
    packagePath?: string;
    version?: string;
    commitMessage?: string;
    cwd?: string;
    pat?: string;
    githubBranch?: string;
    baseContentUrl?: string;
    baseImagesUrl?: string;
    useYarn?: boolean;
    noVerify?: boolean;
    ignoreFile?: string;
    web?: boolean;
}
export declare function publish(options?: IPublishOptions): Promise<any>;
export interface IUnpublishOptions extends IPublishOptions {
    id?: string;
    force?: boolean;
}
export declare function unpublish(options?: IUnpublishOptions): Promise<any>;
