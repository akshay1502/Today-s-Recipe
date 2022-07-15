export function RenderRecipe({ recipe }) {
  const recipeHTML = recipe.join('</br>');
  return (
    <div className="recipeContainer">
      <h1>Recipe</h1>
      <div id="recipe" dangerouslySetInnerHTML={{ __html: recipeHTML }} />
    </div>
  );
}

export function RenderIngredients({ ingredients }) {
  return (
    <div className="ingredients">
      <h1>Ingredients</h1>
      <div id="ingredientList" dangerouslySetInnerHTML={{ __html: ingredients }} />
    </div>
  );
}
