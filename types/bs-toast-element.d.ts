import Toast from 'bootstrap/js/dist/toast';
type State = {
    toast?: Toast;
    content?: string | HTMLElement;
    hidden?: boolean;
};
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
    get state(): State;
    set state(value: State);
}
declare global {
    interface Window {
        BsToastElement: typeof BsToastElement;
    }
}
export {};
