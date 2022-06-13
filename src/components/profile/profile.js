/* eslint-disable no-underscore-dangle */
import './profile.scss';
import { useState, useEffect } from 'react';
import fetchURL from '../../helperFunctions/fetch';
import Card from '../card/card';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [selfRecipes, setSelfRecipes] = useState(null);
  const [bookmarkRecipes, setBookmarkRecipes] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [self, setSelf] = useState(true);
  useEffect(async () => {
    const res = await fetch('http://localhost:5000/users/self', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await res.json();
    setUser(result);
    setBookmarkRecipes(result.bookmarkRecipes);
  }, []);
  useEffect(async () => {
    const result = await fetchURL('recipes/self', 'GET');
    setSelfRecipes(result);
    setRecipes(result);
  }, []);
  const showRecipes = () => { setRecipes(selfRecipes); setSelf(true); };
  const showBookmarkRecipes = async () => {
    const fetchBookmarkRecipes = await Promise.all(bookmarkRecipes.map(async (recipeId) => fetchURL(`recipes/${recipeId}`, 'GET')));
    setSelf(false);
    setRecipes(fetchBookmarkRecipes);
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
            <button type="button" id="editProfile">Edit Profile</button>
          </div>
          <div className="postsData">
            <div className="navigator">
              <button type="button" onClick={showRecipes}>My recipes</button>
              <button type="button" onClick={showBookmarkRecipes}>Bookmark</button>
            </div>
            { recipes
              && recipes.map((recipe) => <Card key={recipe._id} recipe={recipe} self={self} />)}
          </div>
        </div>
        )
      }
    </>
  );
}
