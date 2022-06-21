/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import './profile.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchURL from '../../helperFunctions/fetch';
import Card from '../card/card';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [selfRecipes, setSelfRecipes] = useState(null);
  const [bookmarkRecipes, setBookmarkRecipes] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [self, setSelf] = useState(true);
  useEffect(async () => {
    const res = await fetch(`http://localhost:5000/users/${id || 'self'}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await res.json();
    setUser(result);
    setBookmarkRecipes(result.bookmarkRecipes);
  }, []);
  useEffect(async () => {
    const { result } = await fetchURL(`recipes/users/${id || 'self'}`, 'GET');
    setRecipes(result);
    setSelfRecipes(result);
  }, []);
  const showRecipes = () => { setRecipes(selfRecipes); setSelf(true); };
  const showBookmarkRecipes = async () => {
    const fetchBookmarkRecipes = await Promise.all(bookmarkRecipes.map(async (recipeId) => {
      const { result: recipeData } = await fetchURL(`recipes/${recipeId}`, 'GET');
      return recipeData;
    }));
    setRecipes(fetchBookmarkRecipes);
    setSelf(false);
  };
  const style = `
    text-decoration: underline;
    text-decoration-color: var(--logo-color);
    text-decoration-thickness: 4px;
    text-underline-offset: 8px;
  `;
  const showUnderline = (e) => {
    const myRecipes = document.getElementById('myRecipes');
    const bookmarks = document.getElementById('bookmarks');
    if (e.target.id === 'myRecipes') {
      myRecipes.style.cssText = style;
      bookmarks.style.cssText = '';
    } else {
      myRecipes.style.cssText = '';
      bookmarks.style.cssText = style;
    }
  };
  return (
    <>
      {
        user
        && (
        <div className="profile">
          <div className="self">
            {
              user.profileImage
                ? <img src={user.profileImage} alt={user.firstName} />
                : (
                  <div className="authorprofile" style={{ backgroundColor: `#${user.colorCode}` }}>
                    {`${user.firstName[0]}`}
                  </div>
                )
            }
            <p className="name">
              {user.firstName}
              {' '}
              {user.lastName}
            </p>
            <div className="popularity">
              <p>
                {user.follower.length}
                {' '}
                Follower
              </p>
              <p>
                {user.following.length}
                {' '}
                Following
              </p>
            </div>
            { !id && <button type="button" id="editProfile">Edit Profile</button>}
          </div>
          <div className="postsData">
            <div className="navigator">
              <button
                type="button"
                id="myRecipes"
                style={{
                  textDecoration: 'underline',
                  textDecorationThickness: '4px',
                  textDecorationColor: 'var(--logo-color)',
                  textUnderlineOffset: '8px',
                }}
                onClick={(e) => { showRecipes(); showUnderline(e); }}
              >
                My recipes

              </button>
              <button type="button" id="bookmarks" onClick={(e) => { showBookmarkRecipes(); showUnderline(e); }}>Bookmarks</button>
            </div>
            { recipes && recipes.length
              ? recipes.map((recipe) => <Card key={recipe._id} recipe={recipe} self={self} />)
              : <h1>0</h1>}
          </div>
        </div>
        )
      }
    </>
  );
}
