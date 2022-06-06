import { useState, useEffect } from 'react';
import Card from '../card/card';
import './home.scss';

export default function Home() {
  const [recipes, setRecipes] = useState(null);

  useEffect(async () => {
    const fetchRecipes = await fetch('http://localhost:5000/recipes', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const { allRecipes } = await fetchRecipes.json();
    setRecipes(allRecipes);
  }, []);
  return (
    <div className="grid">
      {
        recipes && recipes.map((recipe) => <Card recipe={recipe} />)
      }
    </div>
  );
}
