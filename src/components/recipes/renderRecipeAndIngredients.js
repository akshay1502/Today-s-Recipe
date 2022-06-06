import { useEffect } from 'react';

export function RenderRecipe({ recipe }) {
  const recipeHTML = recipe.join('</br>');
  useEffect(() => {
    document.getElementById('recipe').innerHTML = recipeHTML;
  });
  return (
    <div className="recipeContainer">
      <h1>Recipe</h1>
      <div id="recipe" />
    </div>
  );
}

export function RenderIngredients({ ingredients }) {
  console.log(ingredients);
  useEffect(() => {
    document.getElementById('ingredientList').innerHTML = ingredients;
  });
  return (
    <div className="ingredients">
      <h1>Ingredients</h1>
      <div id="ingredientList" />
    </div>
  );
}
