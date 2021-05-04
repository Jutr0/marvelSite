import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db, likeUpdate } from "./firebase";

const Comment = (props) => {
  const { uid, description, displayName, userImage, id } = props;
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "comments", id), (snap) => {
      const tempLikes = snap.data().likes;
      setLikes(tempLikes);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="comment">
      <div className="commentUserProfile">
        <div
          className="commentImg"
          style={{
            backgroundImage: `url(${
              userImage ? userImage : "https://via.placeholder.com/150"
            })`,
            backgroundColor: "white",
          }}
        ></div>
        <span>{displayName}</span>
      </div>
      <span className="commentText">{description}</span>
      <div className="commentBtns">
        <span>{likes ? likes : "0"}</span>
        <button onClick={() => likeUpdate(id)}>&#128151;</button>
        <button>&#128172;</button>
      </div>
      <div className="titanic"></div>
    </div>
  );
};

export default Comment;
