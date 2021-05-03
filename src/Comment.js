export default Comment = (props) => {
  const uid = props.uid;

  return (
    <div className="comment">
      <div className="commentUserProfile">
        <div
          className="commentImg"
          style={{
            backgroundImage:
              "url(http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg)",
          }}
        ></div>
        <span>Wiktor Kiełczewski</span>
      </div>
      <span className="commentText">{props.description}</span>
      <div className="commentBtns">
        <span>2</span>
        <button>&#128151;</button>
        <button>&#128172;</button>
      </div>
      <div className="titanic"></div>
    </div>
  );
};
