/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom';
import './card.scss';

export default function Card({ recipe }) {
  const date = new Date(recipe.date).toDateString().split(' ').slice(1);
  const uploadDate = `${date[1]} ${date[0]} ${date[2]}`;
  return (
    <Link to={`/recipes/${recipe._id}`} className="linkComponent" key={recipe._id}>
      <div key={recipe.id} className="card">
        <img src={recipe.image} alt="food dish" />
        <div className="description">
          <h4>{recipe.title.blocks[0].data.text}</h4>
          <div className="descriptionFooter">
            <div className="userInfo">
              {
                recipe.authorProfileImage
                  ? <img src={recipe.authorProfileImage} alt={recipe.author} />
                  : (
                    <div className="authorprofile" style={{ backgroundColor: `#${recipe.authorColorCode}` }}>
                      {`${recipe.author[0]}`}
                    </div>
                  )
              }
              <p>{recipe.author}</p>
              <p>
                ,
                {' '}
                {uploadDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
