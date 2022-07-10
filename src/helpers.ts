import type {BsToastContainerElement, Position} from './bs-toast-container-element'
import type {BsToastElement} from './bs-toast-element'

const getToastContainer = (position: Position): BsToastContainerElement => {
  const already = document.querySelector<BsToastContainerElement>(`bs-toast-container[position="${position}"]`)
  if (already) return already

  const container = document.createElement('bs-toast-container') as BsToastContainerElement
  container.setAttribute('position', position)
  document.body.append(container)
  return container
}

const DEFAULT_POSITION = 'top-right'

type OpenOptions = {
  color?: 'white' | 'black' | 'dark' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
  bgColor?: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary' | 'light' | 'dark'
  position?: Position
  delay?: number
  hideCloseButton?: boolean
}

type Hide = () => void

export const openToast = (content: string | HTMLElement, options: OpenOptions = {}): Hide => {
  const toast = document.createElement('bs-toast') as BsToastElement

  if (options.color) toast.setAttribute('color', options.color)
  if (options.bgColor) toast.setAttribute('bg-color', options.bgColor)
  if (options.delay) toast.setAttribute('delay', options.delay.toString())
  if (options.hideCloseButton) toast.setAttribute('hide-close-button', '')

  toast.content = content
  getToastContainer(options.position ?? DEFAULT_POSITION).add(toast)

  return () => toast.hide()
}
