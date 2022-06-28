/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { AiOutlineSearch, AiFillCaretDown } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.scss';
import fetchURL from '../../helperFunctions/fetch';

export default function Header({ user, fetchStatus }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [searchBox, setSearchBox] = useState('');
  const logout = async () => {
    const { statusValue } = await fetchURL('logout', 'GET');
    if (statusValue === 200) {
      window.location.href = '/';
    }
  };
  const searchForQuery = () => {
    navigate(`/search?query=${searchBox}`);
  };
  return (
    <>
      { pathname === '/signup' || pathname === '/login'
        ? null
        : (
          <nav className="navbar">
            <Link to="/" className="link navbar-brand">Today&apos;s Recipe</Link>
            <div className="navbar-input">
              <input
                type="text"
                id="searchBox"
                name="searchBox"
                value={searchBox}
                onChange={(e) => setSearchBox(e.target.value)}
              />
              <AiOutlineSearch size="2rem" style={{ fill: 'white', cursor: 'pointer' }} type="button" onClick={searchForQuery} />
            </div>
            <div className="navbar-menu">
              {fetchStatus === 200
                ? (
                  <>
                    <button type="button" className="addRecipe">
                      <Link to="/addRecipe" className="link">Add recipe</Link>
                    </button>
                    <div className="user">
                      {user.profileImage
                        ? <img src={user.profileImage} alt={user.firstName} className="userProfileImage" />
                        : (
                          <div className="userProfileImage" style={{ backgroundColor: `#${user.colorCode}` }}>
                            {`${user.firstName[0]}`}
                          </div>
                        )}
                      <AiFillCaretDown onClick={() => setOpen(!open)} className="triangle" />
                      { open && (
                      <div id="subMenuHolder">
                        <ul className="subMenu">
                          <Link to={`/profile/${user._id}`} onClick={() => setOpen(!open)}>Profile</Link>
                          <Link to="/">Notifications</Link>
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
