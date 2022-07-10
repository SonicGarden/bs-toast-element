import type {BsToastContainerElement} from './bs-toast-container-element'
import type {BsToastElement} from './bs-toast-element'

const getToastContainer = (): BsToastContainerElement => {
  const already = document.querySelector<BsToastContainerElement>('bs-toast-container')
  if (already) return already

  const container = document.createElement('bs-toast-container') as BsToastContainerElement
  document.body.append(container)
  return container
}

type OpenOptions = {
  color?: 'white' | 'black' | 'dark' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
  bgColor?: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary' | 'light' | 'dark'
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
  getToastContainer().add(toast)

  return () => toast.hide()
}
