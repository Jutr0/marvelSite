import { useState } from "react";

const Comments = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentsToRender,setCommentsToRender] = useState([]);

    const addComment = _=>{
        
        const tempComments = [...comments,comment]
        const tempCommentsToRender = tempComments.map(step=><div class="comment">{step}</div>)
        setComments(tempComments);
        setCommentsToRender(tempCommentsToRender);
        setComment('');
    }

  return (
    <div class="commentsSection section">
    <div class="navBar"><h1>comments</h1></div>
    <div class="addCommentContainer">
      <div class="addCommentImg"></div>
      <form>
        <textarea
          class="addCommentTextarea"
          maxlength="100"
          value={comment}
          rows="1"
          placeholder="Add Public Comment..."
          onChange={e=>setComment(e.target.value)}
          onBlur={e=>setComment(e.target.value)}
        ></textarea>
        <button class="addCommentBtn" onClick={(e)=>{e.preventDefault();addComment()}}>Comment</button>
      </form>
    </div>
    <div class="comments">
        {commentsToRender}
    </div>
  </div>
  );
};

export default Comments;
