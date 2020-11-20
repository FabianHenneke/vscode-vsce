export interface IPublisher {
    name: string;
    pat: string;
}
export interface IStore {
    publishers: IPublisher[];
}
export interface IGetOptions {
    promptToOverwrite?: boolean;
    promptIfMissing?: boolean;
}
export declare function getPublisher(publisherName: string): Promise<IPublisher>;
export declare function loginPublisher(publisherName: string): Promise<IPublisher>;
export declare function logoutPublisher(publisherName: string): Promise<any>;
export declare function deletePublisher(publisherName: string): Promise<any>;
export declare function listPublishers(): Promise<void>;
