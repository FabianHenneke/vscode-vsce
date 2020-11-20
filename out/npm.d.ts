import { CancellationToken } from './util';
export interface YarnDependency {
    name: string;
    path: string;
    children: YarnDependency[];
}
export declare function detectYarn(cwd: string): Promise<boolean>;
export declare function getDependencies(cwd: string, useYarn?: boolean, packagedDependencies?: string[]): Promise<string[]>;
export declare function getLatestVersion(name: string, cancellationToken?: CancellationToken): Promise<string>;
