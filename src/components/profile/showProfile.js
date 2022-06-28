/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import './showProfile.scss';
import { useState, useEffect } from 'react';
import {
  Link, useParams,
} from 'react-router-dom';
import fetchURL from '../../helperFunctions/fetch';
import Card from '../card/card';

export default function ShowProfile({ user }) {
  let { id } = useParams();
  if (id === user._id) { id = null; }
  const [profile, setProfile] = useState(null);
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
    setProfile(result);
    setBookmarkRecipes(result.bookmarkRecipes);
  }, [id]);
  useEffect(async () => {
    const { result } = await fetchURL(`recipes/users/${id || 'self'}`, 'GET');
    setRecipes(result);
    setSelfRecipes(result);
  }, [id]);
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
  text-decoration-color: var(--primary-color);
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
      {profile
      && (
      <div className="profile main">
        <div className="self">
          {
            profile.profileImage
              ? <img src={profile.profileImage} alt={profile.firstName} className="userProfileImage" />
              : (
                <div className="userProfileImage" style={{ backgroundColor: `#${profile.colorCode}` }}>
                  {`${profile.firstName[0]}`}
                </div>
              )
          }
          <p className="name">
            {profile.firstName}
            {' '}
            {profile.lastName}
          </p>
          <div className="popularity">
            <p>
              {profile.follower.length}
              {' '}
              Follower
            </p>
            <p>
              {profile.following.length}
              {' '}
              Following
            </p>
          </div>
          <EditOrFollow user={user} id={id} />
        </div>
        <div className="postsData">
          <div className="navigator">
            <button
              type="button"
              id="myRecipes"
              style={{
                textDecoration: 'underline',
                textDecorationThickness: '4px',
                textDecorationColor: 'var(--primary-color)',
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
      )}
    </>
  );
}
function EditOrFollow({ user, id }) {
  const [follow, setFollow] = useState(user.following.includes(id));
  const followOrUnfollow = async (followStatus) => {
    const { statusValue } = await fetchURL(`users/${id}/follow`, 'PATCH', { follow: followStatus });
    if (statusValue === 200) {
      setFollow(!follow);
    }
  };
  return (
    <>
      {
        id
          ? (
            follow
              ? <button type="button" id="unfollowBtn" onClick={() => followOrUnfollow(0)}>Unfollow</button>
              : <button type="button" id="followBtn" onClick={() => followOrUnfollow(1)}>Follow</button>
          )
          : <Link to="/profile/edit" type="button" id="editProfile" className="link">Edit Profile</Link>
      }
    </>
  );
}
