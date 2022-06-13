/* eslint-disable no-underscore-dangle */
import './recipes.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconsPack from './icons';
import { RenderRecipe, RenderIngredients } from './renderRecipeAndIngredients';
import fetchURL from '../../helperFunctions/fetch';
import toastMsg from '../../helperFunctions/toast';

const edjsHTML = require('editorjs-html');

const edjsParser = edjsHTML();

export default function Recipes() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await fetch('http://localhost:5000/users/self', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await res.json();
    setUser(result);
  }, []);

  useEffect(async () => {
    const fetchRecipe = await fetch(`http://localhost:5000/recipes/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const getRecipeData = await fetchRecipe.json();
    const parseIngredients = edjsParser.parse(getRecipeData.ingredients);
    const parseRecipe = edjsParser.parse(getRecipeData.recipe);
    setRecipeData(getRecipeData);
    setRecipe(parseRecipe);
    setIngredients(parseIngredients);
  }, []);

  return (
    <div className="recipe">
      { recipeData && user && (
        <>
          <h1 id="title">{recipeData.title.blocks[0].data.text}</h1>
          <div className="userInfo">
            {
              recipeData.authorProfileImage
                ? <img src={recipeData.authorProfileImage} alt={recipeData.authorName} />
                : (
                  <div className="authorprofile" style={{ backgroundColor: `#${recipeData.authorColorCode}` }}>
                    {`${recipeData.authorName[0]}`}
                  </div>
                )
            }
            <p>{recipeData.authorName}</p>
            <Follow user={user} author={recipeData.author} authorName={recipeData.authorName} />
          </div>
          <p className="uploadDate">{new Date(recipeData.date).toDateString()}</p>
          <div className="imageContainer">
            <img src={recipeData.image} alt={recipeData.authorName} />
          </div>
          {ingredients && <RenderIngredients ingredients={ingredients} />}
          {recipe && <RenderRecipe recipe={recipe} />}
          <IconsPack recipe={recipeData} user={user} />
          {/* <textarea id="comment" name="comment" rows="4" cols="40" style={{ padding: '8px' }} />
          <button type="submit" id="addCmt" onClick={handleCommentInput}>Add Comment</button> */}
        </>
      )}
    </div>
  );
}

function Follow({ user, author, authorName }) {
  const { _id, following } = user;
  const followUser = async (userId) => {
    const result = await fetchURL(`users/${userId}/follow`, 'PATCH', { follow: 1 });
    if (result) {
      document.getElementById('follow').style.display = 'none';
      toastMsg('info', `You are following ${authorName}`);
    }
  };
  return (
    <>
      { !(_id === author) && !following.includes(author) && (<button type="button" id="follow" onClick={() => followUser(author)}>Follow</button>) }
    </>
  );
}
