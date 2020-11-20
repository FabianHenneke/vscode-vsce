import { PublishedExtension, ExtensionQueryFlags, FilterCriteria } from 'azure-devops-node-api/interfaces/GalleryInterfaces';
export interface ExtensionQuery {
    readonly pageNumber?: number;
    readonly pageSize?: number;
    readonly flags?: ExtensionQueryFlags[];
    readonly criteria?: FilterCriteria[];
    readonly assetTypes?: string[];
}
export interface IExtensionsReport {
    malicious: string[];
    web: {
        publishers: string[];
        extensions: string[];
    };
}
export declare class PublicGalleryAPI {
    private baseUrl;
    private apiVersion;
    private readonly extensionsReportUrl;
    private readonly client;
    constructor(baseUrl: string, apiVersion?: string);
    private post;
    extensionQuery({ pageNumber, pageSize, flags, criteria, assetTypes, }: ExtensionQuery): Promise<PublishedExtension[]>;
    getExtension(extensionId: string, flags?: ExtensionQueryFlags[]): Promise<PublishedExtension>;
    getExtensionsReport(): Promise<IExtensionsReport>;
}
