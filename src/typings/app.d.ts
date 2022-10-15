declare global {
    export type Nullable<T> = T | null;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
    export type Keys<T extends Record<string, unknown>> = keyof T;

    export module '*.svg';
    export module '*.json';
    export module '*.webp';
    export module '*.jpg';
    export module '*.png';
}

export {};
