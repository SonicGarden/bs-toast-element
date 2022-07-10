import { Toast } from 'bootstrap';
const contentState = new WeakMap();
const toastState = new WeakMap();
export class BsToastElement extends HTMLElement {
    constructor() {
        super(...arguments);
        this.destroy = () => {
            const toast = toastState.get(this);
            toast === null || toast === void 0 ? void 0 : toast.dispose();
            this.remove();
        };
    }
    static get observedAttributes() {
        return ['bg-color', 'delay'];
    }
    connectedCallback() {
        this.innerHTML = `
      <div class="toast align-items-center text-white ${this.bgClassName}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${this.content}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
        this.addEventListener('hidden.bs.toast', this.destroy);
        this.show();
    }
    disconnectedCallback() {
        toastState.delete(this);
        contentState.delete(this);
        this.removeEventListener('hidden.bs.toast', this.destroy);
    }
    show() {
        const element = this.querySelector('.toast');
        if (!element)
            return;
        const toast = new Toast(element, this.options);
        toast.show();
        toastState.set(this, toast);
    }
    get bgClassName() {
        var _a;
        const bgColor = (_a = this.getAttribute('bg-color')) !== null && _a !== void 0 ? _a : 'primary';
        return `bg-${bgColor}`;
    }
    get options() {
        const delay = this.getAttribute('delay');
        return delay ? { delay: Number.parseInt(delay, 10) } : {};
    }
    get content() {
        const content = contentState.get(this) || '';
        return content instanceof HTMLElement ? content.outerHTML : content;
    }
    set content(value) {
        contentState.set(this, value);
    }
}
if (!window.customElements.get('bs-toast')) {
    window.BsToastElement = BsToastElement;
    window.customElements.define('bs-toast', BsToastElement);
}
