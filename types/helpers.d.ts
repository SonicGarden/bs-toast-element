import type { Position } from './bs-toast-container-element';
declare type OpenOptions = {
    color?: 'white' | 'black' | 'dark' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
    bgColor?: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary' | 'light' | 'dark';
    position?: Position;
    delay?: number;
    hideCloseButton?: boolean;
};
declare type Hide = () => void;
export declare const openToast: (content: string | HTMLElement, options?: OpenOptions) => Hide;
export {};
