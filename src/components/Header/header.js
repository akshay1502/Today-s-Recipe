/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiFillCaretDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './header.scss';
import fetchURL from '../../helperFunctions/fetch';

export default function Header() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchBox, setSearchBox] = useState('');
  useEffect(async () => {
    const { result, statusValue } = await fetchURL('users/self', 'GET');
    if (statusValue === 200) {
      setLogin(true);
      setUser(result);
    }
  }, []);
  const showSubMenuHolder = () => {
    setOpen(!open);
  };
  const logout = async () => {
    const { statusValue } = await fetchURL('logout', 'GET');
    if (statusValue === 200) {
      console.log(statusValue);
      window.location.href = '/';
    }
  };
  return (
    <nav className="navbar local-bootstrap">
      <Link to="/" className="navbar-brand">Today&apos;s Recipe</Link>
      <div className="navbar-input">
        <input
          type="text"
          id="searchBox"
          name="searchBox"
          value={searchBox}
          onChange={(e) => setSearchBox(e.target.value)}
        />
        <AiOutlineSearch size="2rem" style={{ fill: 'white' }} />
      </div>
      <div className="navbar-menu">
        {!login && (
        <div className="login">
          <Link to="/login" style={{ textDecoration: 'none', color: 'var(--navbar-text-color)' }}>Login </Link>
        </div>
        )}
        {
          user
          && (
          <>
            <button type="button" className="addRecipe">
              <Link to="/addRecipe">Add recipe</Link>
            </button>
            <div className="user">
              {user.profileImage
                ? <img src={user.profileImage} alt={user.firstName} />
                : (
                  <div className="authorprofile" style={{ backgroundColor: `#${user.colorCode}` }}>
                    {`${user.firstName[0]}`}
                  </div>
                )}
              <AiFillCaretDown onClick={showSubMenuHolder} className="triangle" />
              { open && (
              <div id="subMenuHolder">
                <ul className="subMenu">
                  <Link to="/profile" onClick={() => setOpen(!open)}>Profile</Link>
                  <Link to="/">Notifications</Link>
                  <li onClick={logout}>Logout</li>
                </ul>
              </div>
              )}
            </div>
          </>
          )
        }
      </div>
    </nav>
  );
}
