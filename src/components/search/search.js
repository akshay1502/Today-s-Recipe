/* eslint-disable no-underscore-dangle */
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../card/card';
import fetchURL from '../../helperFunctions/fetch';

export default function Search() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get('query');
  const [recipes, setRecipes] = useState(null);
  useEffect(async () => {
    const { result, statusValue } = await fetchURL(`recipes/search?query=${state}`, 'GET');
    if (statusValue === 200) {
      setRecipes(result);
    }
  }, [state]);
  return (
    <>
      <p style={{ padding: '20px 64px 0 64px' }}>
        Search results for
        {' '}
        <b>
          &quot;
          {state}
          &quot;
        </b>
      </p>
      <div className="grid">
        {
          recipes && recipes.map((recipe) => <Card key={recipe._id} recipe={recipe} />)
        }
      </div>
    </>
  );
}
