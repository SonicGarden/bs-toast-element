import Toast from 'bootstrap/js/dist/toast';
export declare class BsToastElement extends HTMLElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    private render;
    show(): void;
    hide(): void;
    handleClickClose: (event: Event) => void;
    destroy: () => void;
    get bgColor(): string;
    get color(): string;
    get opacity(): string | undefined;
    get hideCloseButton(): boolean;
    get options(): Partial<Toast.Options>;
    get content(): string | HTMLElement;
    set content(value: string | HTMLElement);
}
declare global {
    interface Window {
        BsToastElement: typeof BsToastElement;
    }
}
