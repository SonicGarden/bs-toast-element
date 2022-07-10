import type {BsToastElement} from './bs-toast-element'

const POSITION_CLASSES = {
  'top-left': ['top-0', 'start-0'],
  'top-center': ['top-0', 'start-50', 'translate-middle-x'],
  'top-right': ['top-0', 'end-0'],
  'bottom-left': ['bottom-0', 'start-0'],
  'bottom-center': ['bottom-0', 'start-50', 'translate-middle-x'],
  'bottom-right': ['bottom-0', 'end-0']
}

export type Position = keyof typeof POSITION_CLASSES

export class BsToastContainerElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['position']
  }

  connectedCallback(): void {
    const div = document.createElement('div')
    div.classList.add('toast-container', 'position-fixed', 'p-3', 'vstack', 'gap-1', ...this.positionClasses)
    div.style.zIndex = '1030'
    this.append(div)
  }

  public add(toast: BsToastElement): void {
    const toastContainer = this.querySelector('.toast-container')!
    toastContainer.append(toast)
  }

  get position(): Position {
    const position = this.getAttribute('position')
    return position && Object.keys(POSITION_CLASSES).includes(position) ? (position as Position) : 'top-right'
  }

  get positionClasses(): readonly string[] {
    return POSITION_CLASSES[this.position]
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
