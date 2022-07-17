import Toast from 'bootstrap/js/dist/toast'

const contentState = new WeakMap<BsToastElement, string | HTMLElement>()
const toastState = new WeakMap<BsToastElement, Toast>()

export class BsToastElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color', 'bg-color', 'opacity', 'delay', 'hide-close-button']
  }

  connectedCallback(): void {
    this.render()
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

  private render() {
    // eslint-disable-next-line github/no-inner-html
    this.innerHTML = `
      <div
        class="
          toast align-items-center text-${this.color}
          bg-${this.bgColor} ${this.opacity ? `bg-opacity-${this.opacity}` : ''}
          ${this.hideCloseButton ? 'hide-close-button' : ''}
        "
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
          </div>
          ${
            this.hideCloseButton
              ? ''
              : // eslint-disable-next-line github/unescaped-html-literal
                `<button type="button" class="btn-close btn-close-${this.color} me-2 m-auto" aria-label="Close"></button>`
          }
        </div>
      </div>
    `

    const body = this.querySelector('.toast-body')!
    if (this.content instanceof HTMLElement) {
      body.append(this.content)
    } else {
      body.textContent = this.content
    }
  }

  show() {
    const element = this.querySelector<HTMLDivElement>('.toast')
    if (!element) return

    const toast = new Toast(element, this.options)
    toast.show()
    toastState.set(this, toast)
  }

  hide() {
    const toast = toastState.get(this)
    toast?.hide()
  }

  handleClickClose = (event: Event) => {
    if (!(event.target instanceof HTMLButtonElement && event.target.classList.contains('btn-close'))) return

    this.hide()
  }

  destroy = () => {
    const toast = toastState.get(this)
    toast?.dispose()
    this.remove()
  }

  get bgColor(): string {
    return this.getAttribute('bg-color') ?? 'primary'
  }

  get color(): string {
    return this.getAttribute('color') ?? 'white'
  }

  get opacity(): string | undefined {
    return this.getAttribute('opacity') ?? undefined
  }

  get hideCloseButton(): boolean {
    return this.hasAttribute('hide-close-button') ?? false
  }

  get options(): Partial<Toast.Options> {
    const delay = this.getAttribute('delay')
    return delay ? {delay: Number.parseInt(delay, 10)} : {}
  }

  get content(): string | HTMLElement {
    return contentState.get(this) || ''
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
