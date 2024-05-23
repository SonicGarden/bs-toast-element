import type { BsToastElement } from './bs-toast-element';
declare const POSITION_CLASSES: {
    'top-left': string[];
    'top-center': string[];
    'top-right': string[];
    'bottom-left': string[];
    'bottom-center': string[];
    'bottom-right': string[];
};
export type Position = keyof typeof POSITION_CLASSES;
export declare class BsToastContainerElement extends HTMLElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    add(toast: BsToastElement): void;
    get position(): Position;
    get positionClasses(): readonly string[];
}
declare global {
    interface Window {
        BsToastContainerElement: typeof BsToastContainerElement;
    }
}
export {};
