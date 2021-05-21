import { IAdditionalData } from "../utils/customTypes";

const Comics = (props:{comics:IAdditionalData[]}) => {
  const comics = props.comics.map((step) => (
    <span key={step.name}>{step.name}</span>
  ));

  return (
    <div className="comicsSection section">
      <div className="navBar">
        <h1>COMICS</h1>
      </div>
      <div className="comicsList displayList">
        {comics.length === 0 ? <h1>Not Found any comics</h1> : comics}
      </div>
    </div>
  );
};

export default Comics;
