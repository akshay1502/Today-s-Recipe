import {
  FiThumbsUp, FiBookmark, FiShare2, FiMessageCircle,
} from 'react-icons/fi';

export default function IconsPack() {
  const addToBookmark = () => {
    document.getElementById('bookmarkBtn').style.fill = 'var(--bookmark-btn)';
  };
  const likeRecipe = () => {
    document.getElementById('likeBtn').style.fill = 'var(--like-btn)';
  };
  const commentOnRecipe = () => {
    document.getElementById('commentBtn').style.fill = 'var(--comments-btn)';
  };
  const shareRecipeLink = () => {
    console.log('sharing the recipe link');
  };
  return (
    <div className="iconsPack">
      <div className="likes">
        <FiThumbsUp size="2rem" strokeWidth="1.5" id="likeBtn" onClick={likeRecipe} />
      </div>
      <div className="comments">
        <FiMessageCircle size="2rem" strokeWidth="1.5" id="commentBtn" onClick={commentOnRecipe} />
      </div>
      <div><FiBookmark size="2rem" strokeWidth="1.5" id="bookmarkBtn" onClick={addToBookmark} /></div>
      <div><FiShare2 size="2rem" strokeWidth="1.5" id="shareBtn" onClick={shareRecipeLink} /></div>
    </div>
  );
}
