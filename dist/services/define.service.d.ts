type TProperties = {
    writable?: boolean;
    configurable?: boolean;
    enumerable?: boolean;
};
export declare const get: (obj: Object, property: string, action: () => any, propertes?: TProperties) => void;
export declare const set: (obj: Object, property: string, action: (value: any) => any, propertes?: TProperties) => void;
export declare const define: (obj: Object, property: string, getAction: (value: any) => any, setAction: (value: any) => any, initialVlue: any, propertes?: TProperties) => void;
export {};
