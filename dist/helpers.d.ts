declare type OpenOptions = {
    bgColor?: 'success' | 'danger' | 'warning' | 'info';
    delay?: number;
};
export declare const openToast: (content: string | HTMLElement, options?: OpenOptions) => void;
export {};
