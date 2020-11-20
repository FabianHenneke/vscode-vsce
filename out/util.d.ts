import * as _read from 'read';
import { IGalleryApi } from 'azure-devops-node-api/GalleryApi';
import { PublicGalleryAPI } from './publicgalleryapi';
import { ISecurityRolesApi } from 'azure-devops-node-api/SecurityRolesApi';
export declare function read(prompt: string, options?: _read.Options): Promise<string>;
export declare function getPublishedUrl(extension: string): string;
export declare function getHubUrl(publisher: string, name: string): string;
export declare function getGalleryAPI(pat: string): Promise<IGalleryApi>;
export declare function getSecurityRolesAPI(pat: string): Promise<ISecurityRolesApi>;
export declare function getPublicGalleryAPI(): PublicGalleryAPI;
export declare function normalize(path: string): string;
export declare function chain<T, P>(initial: T, processors: P[], process: (a: T, b: P) => Promise<T>): Promise<T>;
export declare function flatten<T>(arr: T[][]): T[];
export declare function isCancelledError(error: any): boolean;
export declare class CancellationToken {
    private listeners;
    private _cancelled;
    readonly isCancelled: boolean;
    subscribe(fn: Function): Function;
    cancel(): void;
}
export declare function sequence(promiseFactories: {
    (): Promise<any>;
}[]): Promise<void>;
export interface LogFn {
    (msg: any, ...args: any[]): void;
}
export declare const log: {
    done: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
};
