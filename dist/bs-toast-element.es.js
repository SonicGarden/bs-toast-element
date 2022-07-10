import Toast from "bootstrap/js/dist/toast";
class BsToastContainerElement extends HTMLElement {
  connectedCallback() {
    const div = document.createElement("div");
    div.classList.add("toast-container", "position-fixed", "p-3", "top-0", "end-0", "vstack", "gap-1");
    div.style.zIndex = "1030";
    this.append(div);
  }
  add(toast) {
    const toastContainer = this.querySelector(".toast-container");
    toastContainer.append(toast);
  }
}
if (!window.customElements.get("bs-toast-container")) {
  window.BsToastContainerElement = BsToastContainerElement;
  window.customElements.define("bs-toast-container", BsToastContainerElement);
}
const contentState = /* @__PURE__ */ new WeakMap();
const toastState = /* @__PURE__ */ new WeakMap();
class BsToastElement extends HTMLElement {
  constructor() {
    super(...arguments);
    this.destroy = () => {
      const toast = toastState.get(this);
      toast == null ? void 0 : toast.dispose();
      this.remove();
    };
  }
  static get observedAttributes() {
    return ["bg-color", "delay"];
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
    this.addEventListener("hidden.bs.toast", this.destroy);
    this.show();
  }
  disconnectedCallback() {
    toastState.delete(this);
    contentState.delete(this);
    this.removeEventListener("hidden.bs.toast", this.destroy);
  }
  show() {
    const element = this.querySelector(".toast");
    if (!element)
      return;
    const toast = new Toast(element, this.options);
    toast.show();
    toastState.set(this, toast);
  }
  get bgClassName() {
    var _a;
    const bgColor = (_a = this.getAttribute("bg-color")) != null ? _a : "primary";
    return `bg-${bgColor}`;
  }
  get options() {
    const delay = this.getAttribute("delay");
    return delay ? { delay: Number.parseInt(delay, 10) } : {};
  }
  get content() {
    const content = contentState.get(this) || "";
    return content instanceof HTMLElement ? content.outerHTML : content;
  }
  set content(value) {
    contentState.set(this, value);
  }
}
if (!window.customElements.get("bs-toast")) {
  window.BsToastElement = BsToastElement;
  window.customElements.define("bs-toast", BsToastElement);
}
const getToastContainer = () => {
  const already = document.querySelector("bs-toast-container");
  if (already)
    return already;
  const container = document.createElement("bs-toast-container");
  document.body.append(container);
  return container;
};
const openToast = (content, options = {}) => {
  const toast = document.createElement("bs-toast");
  if (options.bgColor)
    toast.setAttribute("bg-color", options.bgColor);
  if (options.delay)
    toast.setAttribute("delay", options.delay.toString());
  toast.content = content;
  getToastContainer().add(toast);
};
export { BsToastContainerElement, BsToastElement, openToast };
