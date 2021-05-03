const Comment = (props) => {
  const {uid,description,displayName,userImage} = props;
  return (
    <div className="comment">
      <div className="commentUserProfile">
        <div
          className="commentImg"
          style={{
            backgroundImage:
              `url(${userImage ? userImage:'https://via.placeholder.com/150'})`,
              backgroundColor:"white"
          }}
        ></div>
        <span>{displayName}</span>
      </div>
      <span className="commentText">{description}</span>
      <div className="commentBtns">
        <span>2</span>
        <button>&#128151;</button>
        <button>&#128172;</button>
      </div>
      <div className="titanic"></div>
    </div>
  );
};

export default Comment;
