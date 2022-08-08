// import { FaSpinner } from 'react-icons/fa';
import './loading.scss';

export function Loading() {
  return (
    <div className="center">Loading...</div>
  );
}

export function ReactSpinner({ icon }) {
  return (
    <div className="center">
      {icon}
    </div>
  );
}
