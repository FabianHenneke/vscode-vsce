import { Manifest } from './manifest';
export interface ITranslations {
    [key: string]: string;
}
export declare function patchNLS(manifest: Manifest, translations: ITranslations): Manifest;
