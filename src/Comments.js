import { useEffect, useState } from "react";
import { collection, addDoc, where, onSnapshot, query, orderBy } from 'firebase/firestore';

import { collectIdsAndDocs } from './utilities';
import Comment from "./Comment";
import {firebaseApp, db} from "./firebase";

const Comments = (props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(true);

  useEffect(_ => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"), where("character", "==" , +props.id));
    const unsubscribe = onSnapshot(q, snapshot => {
      const tempComments = snapshot.docs.map(collectIdsAndDocs).map((step)=>{
        return <Comment description={step.description} uid={step.uid}/>
      });
      
      setComments(tempComments);
    })

    return() => {unsubscribe()}
  },[])

  const addComment = async (_) => {
    try{
      const tempComment = comment;
      setComment("");
      const docRef = await addDoc(collection(db,"comments"), {
        description:tempComment,
        uid: 1,
        displayName: "Wiktor Kiełczewski",
        likes: 0,
        comments:0,
        userImage:null,
        createdAt: new Date().toISOString(),
        character: +props.id,
      });
      console.log("Document written with ID: ", docRef.id);
    }catch(e){
      console.error("Error adding document: ", e);
    }

  };
  console.log("before render",{comments})
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
      <div className="comments">{comments}</div>
    </div>
  );
};

export default Comments;
