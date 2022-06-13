import {
  FiThumbsUp, FiBookmark, FiShare2, FiMessageCircle,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import fetchURL from '../../helperFunctions/fetch';

export default function IconsPack({ recipe, user }) {
  const { _id: recipeId, likes } = recipe;
  const { _id: userId, bookmarkRecipes } = user;
  const [like, setLike] = useState(1);
  const [bookmark, setBookmark] = useState(1);
  let bookmarkBtn;
  let likeBtn;
  const addToBookmark = async () => {
    if (bookmark) {
      bookmarkBtn.style.fill = 'var(--bookmark-btn)';
      const result = await fetchURL(`recipes/${recipeId}/bookmark`, 'PATCH', { bookmark });
      if (result) {
        setBookmark(0);
      }
    } else {
      bookmarkBtn.style.fill = 'white';
      const result = await fetchURL(`recipes/${recipeId}/bookmark`, 'PATCH', { bookmark });
      if (result) {
        setBookmark(1);
      }
    }
  };
  const likeRecipe = async () => {
    if (like) {
      likeBtn.style.fill = 'var(--like-btn)';
      const res = await fetch(`http://localhost:5000/recipes/${recipeId}/likeOrdislike`, {
        method: 'PATCH',
        body: JSON.stringify({
          like,
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await res.json();
      if (result) {
        setLike(0);
      }
    } else {
      likeBtn.style.fill = 'white';
      const res = await fetch(`http://localhost:5000/recipes/${recipeId}/likeOrdislike`, {
        method: 'PATCH',
        body: JSON.stringify({
          like,
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await res.json();
      if (result) {
        setLike(1);
      }
    }
  };
  useEffect(() => {
    bookmarkBtn = document.getElementById('bookmarkBtn');
    likeBtn = document.getElementById('likeBtn');
    if (bookmarkRecipes.includes(recipeId)) {
      bookmarkBtn.style.fill = 'var(--bookmark-btn)';
      setBookmark(0);
    }
    if (likes.includes(userId)) {
      likeBtn.style.fill = 'var(--like-btn)';
      setLike(0);
    }
  });
  return (
    <div className="iconsPack">
      <div className="likes">
        <FiThumbsUp size="2rem" strokeWidth="1.5" id="likeBtn" onClick={likeRecipe} style={{ marginRight: '16px' }} />
        {likes.length}
      </div>
      <div className="comments">
        <FiMessageCircle size="2rem" strokeWidth="1.5" id="commentBtn" />
      </div>
      <div><FiBookmark size="2rem" strokeWidth="1.5" id="bookmarkBtn" onClick={addToBookmark} /></div>
      <div><FiShare2 size="2rem" strokeWidth="1.5" id="shareBtn" /></div>
    </div>
  );
}
