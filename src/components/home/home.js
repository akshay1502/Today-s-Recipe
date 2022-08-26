/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import useFetch from '../../helperFunctions/useFetch';
import Card from '../card/card';
import SearchBox from '../search/searchBox';
import './home.scss';

export default function Home() {
  const [recipes, setRecipes] = useState(null);

  const { result } = useFetch('/recipes', 'GET');
  useEffect(async () => {
    setRecipes(result);
  }, [result]);
  return (
    <div className="grid main">
      <SearchBox />
      {
        recipes
          && recipes.length
          && recipes.map((recipe) => <Card key={recipe._id} recipe={recipe} />)
      }
    </div>
  );
}
