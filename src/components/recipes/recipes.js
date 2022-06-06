import './recipes.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconsPack from './icons';
import { RenderRecipe, RenderIngredients } from './renderRecipeAndIngredients';

const edjsHTML = require('editorjs-html');

const edjsParser = edjsHTML();

export default function Recipes() {
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
  }, []);

  // const handleCommentInput = () => {
  //   const comment = document.getElementById('comment').value;
  //   if (!comment.length) {
  //     alert("comment can't be empty");
  //   }
  // };

  return (
    <div className="recipe">
      { recipeData && (
        <>
          <h1 id="title">{recipeData.title.blocks[0].data.text}</h1>
          <div className="userInfo">
            {
              recipeData.authorProfileImage
                ? <img src={recipeData.authorProfileImage} alt={recipeData.author} />
                : (
                  <div className="authorprofile" style={{ backgroundColor: `#${recipeData.authorColorCode}` }}>
                    {`${recipeData.author[0]}`}
                  </div>
                )
            }
            <p>{recipeData.author}</p>
            <button type="button">Follow</button>
          </div>
          <p className="uploadDate">{new Date(recipeData.date).toDateString()}</p>
          <div className="imageContainer">
            <img src={recipeData.image} alt={recipeData.author} />
          </div>
          {ingredients && <RenderIngredients ingredients={ingredients} />}
          {recipe && <RenderRecipe recipe={recipe} />}
          <IconsPack />
          {/* <textarea id="comment" name="comment" rows="4" cols="40" style={{ padding: '8px' }} />
          <button type="submit" id="addCmt" onClick={handleCommentInput}>Add Comment</button> */}
        </>
      )}
    </div>
  );
}
