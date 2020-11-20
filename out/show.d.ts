export interface ExtensionStatiticsMap {
    install: number;
    averagerating: number;
    ratingcount: number;
}
export declare function show(extensionId: string, json?: boolean): Promise<any>;
