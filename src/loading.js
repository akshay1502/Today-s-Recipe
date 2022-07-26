import { FaSpinner } from 'react-icons/fa';
import './loading.scss';

export function Loading() {
  return (
    <div className="center">Loading...</div>
  );
}

export function SpinnerIcon() {
  return (
    <div>
      <FaSpinner style={{ display: 'flex' }} className="spinner center" size="32px" />
    </div>
  );
}
