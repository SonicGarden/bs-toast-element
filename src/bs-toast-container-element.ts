import type {BsToastElement} from './bs-toast-element'

export class BsToastContainerElement extends HTMLElement {
  connectedCallback(): void {
    const div = document.createElement('div')
    div.classList.add('toast-container', 'position-fixed', 'p-3', 'top-0', 'end-0')
    div.style.zIndex = '1030'
    this.append(div)
  }

  public add(toast: BsToastElement): void {
    const toastContainer = this.querySelector('.toast-container')!
    toastContainer.append(toast)
  }
}

declare global {
  interface Window {
    BsToastContainerElement: typeof BsToastContainerElement
  }
}

if (!window.customElements.get('bs-toast-container')) {
  window.BsToastContainerElement = BsToastContainerElement
  window.customElements.define('bs-toast-container', BsToastContainerElement)
}
