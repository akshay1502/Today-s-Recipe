/* eslint-disable no-nested-ternary */
import './showProfile.scss';
import { useState, useEffect, useRef } from 'react';
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
  const recipesRef = useRef(null);
  const bookmarkRecipesRef = useRef(null);
  useEffect(async () => {
    const { result } = await fetchURL(`/users/${id || 'self'}`, 'GET');
    setProfile(result);
    setBookmarkRecipes(result.bookmarkRecipes);
  }, [id]);
  useEffect(async () => {
    const { result } = await fetchURL(`/recipes/users/${id || 'self'}`, 'GET');
    setRecipes(result);
    setSelfRecipes(result);
  }, [id]);
  const showRecipes = () => { setRecipes(selfRecipes); setSelf(true); };
  const showBookmarkRecipes = async () => {
    const fetchBookmarkRecipes = await Promise.all(bookmarkRecipes.map(async (recipeId) => {
      const { result: recipeData } = await fetchURL(`/recipes/${recipeId}`, 'GET');
      return recipeData;
    }));
    setRecipes(fetchBookmarkRecipes);
    setSelf(false);
  };
  const showUnderline = () => {
    if (id === null) {
      recipesRef.current.classList.toggle('underline');
      bookmarkRecipesRef.current.classList.toggle('underline');
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
          <div className="selfData">
            <h2>
              {profile.firstName}
              {' '}
              {profile.lastName}
            </h2>
            <div className="popularity">
              <span>
                {profile.follower.length}
                {' '}
                Follower
              </span>
              <span>
                {profile.following.length}
                {' '}
                Following
              </span>
            </div>
            <EditOrFollow user={user} id={id} />
          </div>
        </div>
        <div className="postsData">
          <div className="navigator">
            <button
              type="button"
              id="recipes"
              ref={recipesRef}
              className="underline"
              onClick={() => { showRecipes(); showUnderline(); }}
            >
              Recipes
            </button>
            { id === null && <button type="button" id="bookmarks" ref={bookmarkRecipesRef} onClick={() => { showBookmarkRecipes(); showUnderline(); }}>Bookmarks</button> }
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
