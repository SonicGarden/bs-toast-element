import Toast from 'bootstrap/js/dist/toast'

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
          <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
        </div>
      </div>
    `

    this.addEventListener('hidden.bs.toast', this.destroy)
    // NOTE: Do not use `data-bs-dismiss` as it may be called twice
    this.addEventListener('click', this.handleClickClose)
    this.show()
  }

  disconnectedCallback() {
    toastState.delete(this)
    contentState.delete(this)
    this.removeEventListener('hidden.bs.toast', this.destroy)
    this.removeEventListener('click', this.handleClickClose)
  }

  show() {
    const element = this.querySelector<HTMLDivElement>('.toast')
    if (!element) return

    const toast = new Toast(element, this.options)
    toast.show()
    toastState.set(this, toast)
  }

  handleClickClose = (event: Event) => {
    if (!(event.target instanceof HTMLButtonElement && event.target.classList.contains('btn-close'))) return

    const toast = toastState.get(this)
    toast?.hide()
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
