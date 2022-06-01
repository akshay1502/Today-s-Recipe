import { toast, ToastContainer } from 'react-toastify';

export default function ToastMsg({ type, msg }) {
  toast[type](msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
  return (
    <ToastContainer />
  );
}
