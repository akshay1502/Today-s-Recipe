/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import SearchBox from '../search/searchBox';
import './header.scss';
import fetchURL from '../../helperFunctions/fetch';

export default function Header({ user, fetchStatus }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const logout = async () => {
    const { statusValue } = await fetchURL('/logout', 'GET');
    if (statusValue === 200) {
      window.location.href = '/';
    }
  };
  return (
    <>
      { pathname === '/signup' || pathname === '/login'
        ? null
        : (
          <nav className="navbar">
            <Link to="/" className="link navbar-brand">Today&apos;s Recipe</Link>
            <SearchBox className="resSearch" />
            <div className="navbar-menu">
              {fetchStatus === 200
                ? (
                  <>
                    <button type="button" className="addRecipe">
                      <Link to="/addRecipe" className="link">Add recipe</Link>
                    </button>
                    <div className="user" onClick={() => setOpen(!open)}>
                      {user.profileImage
                        ? <img src={user.profileImage} alt={user.firstName} className="userProfileImage" />
                        : (
                          <div className="userProfileImage" style={{ backgroundColor: `#${user.colorCode}` }}>
                            {`${user.firstName[0]}`}
                          </div>
                        )}
                      <AiFillCaretDown className="triangle" />
                      {open && (
                      <div id="subMenuHolder">
                        <ul className="subMenu">
                          <Link to={`/profile/${user._id}`} onClick={() => setOpen(!open)}>Profile</Link>
                          <Link to="/addRecipe" className="resAddRecipe">Add recipe</Link>
                          {/* <Link to="/">Notifications</Link> will be using in next update */}
                          <li onClick={logout}>Logout</li>
                        </ul>
                      </div>
                      )}
                    </div>
                  </>
                )
                : (
                  <div className="login">
                    <Link to="/login" className="link" style={{ color: 'white' }}>Login </Link>
                  </div>
                )}
            </div>
          </nav>
        )}
    </>
  );
}
