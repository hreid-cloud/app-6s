import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      background: '#f0fdf4',
      border: '1px solid #059669',
      color: '#059669',
    },
  });
};

export const showErrorToast = (message) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      background: '#fef2f2',
      border: '1px solid #DC2626',
      color: '#DC2626',
    },
  });
}; 