/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import './card.scss';

export default function card() {
  const [recipes, setRecipes] = useState(null);

  useEffect(async () => {
    const fetchRecipes = await fetch('http://localhost:5500/recipes');
    const getRecipes = await fetchRecipes.json();
    setRecipes(getRecipes);
  }, []);

  return (
    <div className="grid">
      { recipes
        && recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img src={recipe.image} alt="food dish" />
            <div className="description">
              <h4>{recipe.title}</h4>
              <div className="descriptionFooter">
                <div className="userInfo">
                  <img src={recipe.userImage} alt={recipe.usreName} />
                  <p>{recipe.userName}</p>
                  <p>
                    ,
                    {' '}
                    {recipe.upload}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
