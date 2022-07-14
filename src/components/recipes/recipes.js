/* eslint-disable no-underscore-dangle */
import './recipes.scss';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import IconsPack from './icons';
import { RenderRecipe, RenderIngredients } from './renderRecipeAndIngredients';
import fetchURL from '../../helperFunctions/fetch';
import toastMsg from '../../helperFunctions/toast';

const edjsHTML = require('editorjs-html');

const edjsParser = edjsHTML();

export default function Recipes({ user }) {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(null);

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
    console.log(parseRecipe);
  }, [id]);

  return (
    <div className="recipe main">
      { recipeData && user && (
        <>
          <h1 id="title">{recipeData.title.blocks[0].data.text}</h1>
          <div className="userInfo">
            {
              recipeData.authorProfileImage
                ? <img src={recipeData.authorProfileImage} alt={recipeData.authorName} className="userProfileImage" />
                : (
                  <div className="userProfileImage" style={{ backgroundColor: `#${recipeData.authorColorCode}` }}>
                    {`${recipeData.authorName[0]}`}
                  </div>
                )
            }
            <Link className="link userLink" to={`/profile/${recipeData.author}`}>{recipeData.authorName}</Link>
            <Follow user={user} author={recipeData.author} authorName={recipeData.authorName} />
          </div>
          <p className="uploadDate">{new Date(recipeData.date).toDateString()}</p>
          <div className="imageContainer">
            <img src={recipeData.image} alt={recipeData.authorName} />
          </div>
          {ingredients && <RenderIngredients ingredients={ingredients} />}
          {recipe && <RenderRecipe recipe={recipe} />}
          <IconsPack recipe={recipeData} user={user} />
        </>
      )}
    </div>
  );
}

function Follow({ user, author, authorName }) {
  const { _id, following } = user;
  const followUser = async (userId) => {
    const { statusValue } = await fetchURL(`/users/${userId}/follow`, 'PATCH', { follow: 1 });
    if (statusValue === 200) {
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
