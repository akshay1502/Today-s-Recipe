import { Link } from 'react-router-dom';
import './home.scss';

export default function NoLoggedInUser() {
  return (
    <div className="main centerText">
      <p>
        <Link to="/login" className="noLoggedInBtn">Login</Link>
        {' '}
        /
        {' '}
        <Link to="/signup" className="noLoggedInBtn">Signup</Link>
        {' '}
        to continue.
      </p>
    </div>
  );
}
