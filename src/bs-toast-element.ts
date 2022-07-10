import {Toast} from 'bootstrap'

const contentState = new WeakMap<BsToastElement, string | HTMLElement>()
const toastState = new WeakMap<BsToastElement, Toast>()

export class BsToastElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['bg-color', 'delay']
  }

  connectedCallback(): void {
    // eslint-disable-next-line github/no-inner-html
    this.innerHTML = `
      <div class="toast align-items-center text-white ${this.bgClassName}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${this.content}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `

    this.addEventListener('hidden.bs.toast', this.destroy)
    this.show()
  }

  disconnectedCallback() {
    toastState.delete(this)
    contentState.delete(this)
    this.removeEventListener('hidden.bs.toast', this.destroy)
  }

  show() {
    const element = this.querySelector<HTMLDivElement>('.toast')
    if (!element) return

    const toast = new Toast(element, this.options)
    toast.show()
    toastState.set(this, toast)
  }

  destroy = () => {
    const toast = toastState.get(this)
    toast?.dispose()
    this.remove()
  }

  get bgClassName(): string {
    const bgColor = this.getAttribute('bg-color') ?? 'primary'
    return `bg-${bgColor}`
  }

  get options(): Partial<Toast.Options> {
    const delay = this.getAttribute('delay')
    return delay ? {delay: Number.parseInt(delay, 10)} : {}
  }

  get content(): string | HTMLElement {
    const content = contentState.get(this) || ''
    return content instanceof HTMLElement ? content.outerHTML : content
  }

  set content(value: string | HTMLElement) {
    contentState.set(this, value)
  }
}

declare global {
  interface Window {
    BsToastElement: typeof BsToastElement
  }
}

if (!window.customElements.get('bs-toast')) {
  window.BsToastElement = BsToastElement
  window.customElements.define('bs-toast', BsToastElement)
}
