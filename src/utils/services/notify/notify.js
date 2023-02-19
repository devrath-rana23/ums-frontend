import { toast } from 'react-toastify';

const options = {
  position: "top-center",
  autoClose: true,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"
}

export const notify = {
  success: (message) => { toast.success(message, { ...options }) },
  error: (message) => { toast.error(message, { ...options }) },
  warn: (message) => { toast.warn(message, { ...options }) },
  info: (message) => { toast.info(message, { ...options }) }
}