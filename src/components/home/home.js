/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import fetchURL from '../../helperFunctions/fetch';
import Card from '../card/card';
import SearchBox from '../search/searchBox';
import './home.scss';
import NoLoggedInUser from './nologgedinuser';

export default function Home({ user }) {
  const [recipes, setRecipes] = useState(null);

  useEffect(async () => {
    const { result } = await fetchURL('/recipes', 'GET');
    setRecipes(result);
  }, []);
  return (
    <>
      { user ? (
        <div className="grid main">
          <SearchBox />
          {
          recipes
            && recipes.length
            && recipes.map((recipe) => <Card key={recipe._id} recipe={recipe} />)
        }
        </div>
      ) : <NoLoggedInUser />}
    </>
  );
}
