export declare type ViewTableRow = string[];
export declare type ViewTable = ViewTableRow[];
export declare const icons: {
    download: string;
    star: string;
    emptyStar: string;
};
export declare function formatDate(date: any): any;
export declare function formatTime(date: any): any;
export declare function formatDateTime(date: any): any;
export declare function repeatString(text: string, count: number): string;
export declare function ratingStars(rating: number, total?: number): string;
export declare function tableView(table: ViewTable, spacing?: number): string[];
export declare function wordWrap(text: string, width?: number): string;
export declare function indentRow(row: string): string;
export declare function wordTrim(text: string, width?: number, indicator?: string): string;
