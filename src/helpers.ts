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
  bgColor?: 'success' | 'danger' | 'warning' | 'info'
  delay?: number
}

export const openToast = (content: string | HTMLElement, options: OpenOptions = {}) => {
  const toast = document.createElement('bs-toast') as BsToastElement
  if (options.bgColor) toast.setAttribute('bg-color', options.bgColor)
  if (options.delay) toast.setAttribute('delay', options.delay.toString())

  toast.content = content
  getToastContainer().add(toast)
}
