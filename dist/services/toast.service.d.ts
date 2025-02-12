import { TThemes } from "../types/TThemes.type";
interface IToastOptions {
    theme?: TThemes;
    hasButton?: false;
    clickToClose?: true;
    linger?: number;
    classes?: Array<string>;
    buttonClasses?: Array<string>;
}
export declare const toast: (message: string, theme?: TThemes | IToastOptions) => Promise<void>;
export {};
