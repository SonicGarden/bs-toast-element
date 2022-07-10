import Toast from 'bootstrap/js/dist/toast';
export declare class BsToastElement extends HTMLElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    show(): void;
    destroy: () => void;
    get bgClassName(): string;
    get options(): Partial<Toast.Options>;
    get content(): string | HTMLElement;
    set content(value: string | HTMLElement);
}
declare global {
    interface Window {
        BsToastElement: typeof BsToastElement;
    }
}
