/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import useFetch from '../../helperFunctions/useFetch';
import Card from '../card/card';
import SearchBox from '../search/searchBox';
import './home.scss';
import NoLoggedInUser from './nologgedinuser';

export default function Home({ user }) {
  const [recipes, setRecipes] = useState(null);

  const { loading, error, result } = useFetch('/recipes', 'GET');
  useEffect(async () => {
    setRecipes(result);
  }, [result]);
  return (
    <>
      {
        user ? (
          <>
            {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
              <div className="grid main">
                <SearchBox />
                {
                  recipes
                    && recipes.length
                    && recipes.map((recipe) => <Card key={recipe._id} recipe={recipe} />)
                }
              </div>
            )}
            {error && <p>{error.message}</p>}
          </>
        )
          : <NoLoggedInUser />
      }
    </>
  );
}
