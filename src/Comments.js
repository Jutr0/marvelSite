import { useState } from "react";
import Comment from "./Comment";

import {firestore} from "./firebase";

const Comments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsToRender, setCommentsToRender] = useState([]);

  const addComment = (_) => {
    firestore.collection('comments').add({comment});
    const tempComments = [...comments, comment];
    const tempCommentsToRender = tempComments.map((step) => (
      <Comment description={step} uid={0} />
    ));
    setComments(tempComments);
    setCommentsToRender(tempCommentsToRender);
    setComment("");
  };

  return (
    <div className="commentsSection section">
      <div className="navBar">
        <h1>comments</h1>
      </div>
      <div className="addCommentContainer">
        <div className="addCommentImg"></div>
        <form>
          <textarea
            className="addCommentTextarea"
            maxLength="100"
            value={comment}
            rows="1"
            placeholder="Add Public Comment..."
            onChange={(e) => setComment(e.target.value)}
            onBlur={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="addCommentBtn"
            onClick={(e) => {
              e.preventDefault();
              addComment();
            }}
          >
            Comment
          </button>
        </form>
      </div>
      <div className="comments">{commentsToRender}</div>
    </div>
  );
};

export default Comments;
