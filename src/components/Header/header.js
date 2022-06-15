import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './header.scss';
import fetchURL from '../../helperFunctions/fetch';

export default function Header() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const { result, statusValue } = await fetchURL('users/self', 'GET');
    if (statusValue === 200) {
      setLogin(true);
      setUser(result);
      console.log(result);
    }
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-brand">Today&apos;s Recipe</div>
      <div className="navbar-input">
        <input type="text" className="searchBox" />
        <AiOutlineSearch size="2rem" />
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
              <FaAngleDown size="1rem" style={{ marginLeft: '8px' }} />
            </div>
          </>
          )
        }
      </div>
    </nav>
  );
}
