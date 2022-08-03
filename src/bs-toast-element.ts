import Toast from 'bootstrap/js/dist/toast'

type State = {
  toast?: Toast
  content?: string | HTMLElement
  hidden?: boolean
}

// const contentState = new WeakMap<BsToastElement, string | HTMLElement>()
// const toastState = new WeakMap<BsToastElement, Toast>()
const states = new WeakMap<BsToastElement, State>()

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
    states.delete(this)
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
    this.state = {...this.state, toast}
  }

  hide() {
    // NOTE: Calling twice results in an error.
    if (this.state.hidden) return

    this.state = {...this.state, hidden: true}
    this.state.toast?.hide()
  }

  handleClickClose = (event: Event) => {
    if (!(event.target instanceof HTMLButtonElement && event.target.classList.contains('btn-close'))) return

    this.hide()
  }

  destroy = () => {
    this.state.toast?.dispose()
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
    return this.state.content ?? ''
  }

  set content(value: string | HTMLElement) {
    this.state = {...this.state, content: value}
  }

  get state(): State {
    return states.get(this) || {}
  }

  set state(value) {
    states.set(this, value)
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
