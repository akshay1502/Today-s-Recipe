import {
  FiThumbsUp, FiBookmark, FiShare2, FiMessageCircle, FiMoreVertical,
} from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchURL from '../../helperFunctions/fetch';
import toastMsg from '../../helperFunctions/toast';

export default function IconsPack({ recipe, user }) {
  const { _id: recipeId, likes, comments } = recipe;
  const { _id: userId, bookmarkRecipes } = user;
  const [like, setLike] = useState(1);
  const [bookmark, setBookmark] = useState(1);
  const [showComments, setShowComments] = useState(false);
  const [textarea, setTextarea] = useState('');
  let bookmarkBtn;
  let likeBtn;
  let commentBtn;
  const textareaRef = useRef(null);
  const addToBookmark = async () => {
    bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmark) {
      bookmarkBtn.style.fill = 'var(--bookmark-btn)';
      const { result } = await fetchURL(`/recipes/${recipeId}/bookmark`, 'PATCH', { bookmark });
      if (result.success) {
        setBookmark(0);
      }
    } else {
      bookmarkBtn.style.fill = 'white';
      const { result } = await fetchURL(`/recipes/${recipeId}/bookmark`, 'PATCH', { bookmark });
      if (result.success) {
        setBookmark(1);
      }
    }
  };
  const likeRecipe = async () => {
    likeBtn = document.getElementById('likeBtn');
    if (like) {
      likeBtn.style.fill = 'var(--like-btn)';
      const { result } = await fetchURL(`/recipes/${recipeId}/likeOrdislike`, 'PATCH', { like: 1 });
      if (result.success) {
        setLike(0);
      }
    } else {
      likeBtn.style.fill = 'white';
      const { result } = await fetchURL(`/recipes/${recipeId}/likeOrdislike`, 'PATCH', { like: 0 });
      if (result.success) {
        setLike(1);
      }
    }
  };
  const commentOnRecipe = () => {
    commentBtn = document.getElementById('commentBtn');
    if (showComments) {
      commentBtn.style.fill = 'white';
    } else {
      commentBtn.style.fill = 'var(--comments-btn)';
    }
    setShowComments(!showComments);
  };
  const handleCommentInput = async () => {
    const comment = textareaRef.current.value.trim();
    if (comment.length) {
      const { result } = await fetchURL(`/recipes/${recipeId}/comment`, 'POST', { userId, comment });
      if (result.success) {
        toastMsg('info', 'Comment added');
      }
    } else {
      alert('Comment can\'t be empty');
    }
  };
  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toastMsg('info', 'Link copied');
  };

  useEffect(() => {
    likeBtn = document.getElementById('likeBtn');
    bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkRecipes.includes(recipeId)) {
      bookmarkBtn.style.fill = 'var(--bookmark-btn)';
      setBookmark(0);
    }
    if (likes.includes(userId)) {
      likeBtn.style.fill = 'var(--like-btn)';
      setLike(0);
    }
  }, []);
  return (
    <>
      <div className="iconsPack">
        <div className="likes">
          <FiThumbsUp size="32px" strokeWidth="1.5" id="likeBtn" onClick={likeRecipe} style={{ marginRight: '12px' }} />
          {!!likes.length && likes.length}
        </div>
        <div className="comments">
          <FiMessageCircle size="32px" strokeWidth="1.5" id="commentBtn" onClick={() => { commentOnRecipe(); }} style={{ marginRight: '12px' }} />
          {!!comments.length && comments.length}
        </div>
        <div className="bookmark">
          <FiBookmark size="32px" strokeWidth="1.5" id="bookmarkBtn" onClick={addToBookmark} />
        </div>
        <div className="share">
          <FiShare2 size="28px" strokeWidth="1.5" id="shareBtn" onClick={shareLink} />
        </div>
      </div>
      { showComments && (
      <>
        <div>
          <textarea
            ref={textareaRef}
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            name="comment"
            rows="3"
            cols="40"
            style={{ padding: '8px' }}
          />
          <button type="submit" id="addCmt" onClick={handleCommentInput}>Add Comment</button>
        </div>
        { Boolean(comments.length) && (
        <>
          <h2 style={{ fontWeight: 'var(--semi-bold-font)' }}>Comments</h2>
          <hr />
          {
            comments.map((comment) => (
              <RenderComment
                key={comment._id}
                comment={comment}
                self={userId}
              />
            ))
          }
        </>
        )}
      </>
      )}
    </>
  );
}

function RenderComment({ comment, self }) {
  const [user, setUser] = useState('null');
  useEffect(async () => {
    const { result } = await fetchURL(`/users/${comment.userId}`, 'GET');
    setUser(result);
  }, [comment]);
  return (
    <>
      {
      user && (
        <div className="commentBox">
          {
            user.profileImage
              ? <img src={user.profileImage} alt={user.firstName} className="userProfileImage" />
              : (
                <div className="userProfileImage" style={{ backgroundColor: `#${user.colorCode}` }}>
                  {`${user.firstName}`[0]}
                </div>
              )
          }
          <div className="comment">
            <Link
              className="link userLink"
              to={`/profile/${user._id}`}
              style={{ fontWeight: 'var(--light-font)' }}
            >
              {`${user.firstName} ${user.lastName}`}
            </Link>
            <p>{comment.comment}</p>
          </div>
          <div className="moreBtn">
            {
              self === comment.userId && <FiMoreVertical />
            }
          </div>
        </div>
      )
      }
    </>
  );
}
