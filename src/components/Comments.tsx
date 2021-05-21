import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  where,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { collectIdsAndDocs } from "../utils/utilities";
import Comment from "./Comment";
import { auth, db } from "../utils/firebase";

const Comments = (props:{id:number}) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      orderBy("createdAt", "desc"),
      where("character", "==", + props.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tempComments = snapshot.docs.map(collectIdsAndDocs).map((step) => {
        return <Comment key={step.id} {...step} />;
      });

      setComments(tempComments);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addComment = async () => {
    try {
      if(auth.currentUser !== null){
        
      const tempComment = comment;
      setComment("");
      const docRef = await addDoc(collection(db, "comments"), {
        description: tempComment,
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        likes: 0,
        comments: 0,
        userImage: auth.currentUser.photoURL,
        createdAt: new Date().toISOString(),
        character: +props.id,
      });
    }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="commentsSection section">
      <div className="navBar">
        <h1>comments</h1>
      </div>
      <div className="addCommentContainer">
        <div
          className="addCommentImg"
          style={{
            backgroundImage: `url(${
              auth.currentUser !== null
                ? auth.currentUser.photoURL
                : "https://via.placeholder.com/150"
            })`,
            backgroundColor: "white",
          }}
        ></div>
        <form>
          <textarea
            className="addCommentTextarea"
            maxLength={100}
            value={comment}
            rows={1}
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
      <div className="comments">{comments}</div>
    </div>
  );
};

export default Comments;
