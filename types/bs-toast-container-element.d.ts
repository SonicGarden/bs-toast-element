import type { BsToastElement } from './bs-toast-element';
export declare class BsToastContainerElement extends HTMLElement {
    connectedCallback(): void;
    add(toast: BsToastElement): void;
}
declare global {
    interface Window {
        BsToastContainerElement: typeof BsToastContainerElement;
    }
}
