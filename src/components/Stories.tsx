import { IAdditionalData } from "../utils/customTypes";

const Stories = (props:{stories:IAdditionalData[]}) => {
  const stories = props.stories.map((step) => (
    <span key={step.name}>{step.name}</span>
  ));

  return (
    <div className="storiesSection section">
      <div className="navBar">
        <h1>stories</h1>
      </div>
      <div className="storiesList displayList">
        {stories.length === 0 ? <h1>Not Found any stories</h1> : stories}
      </div>
    </div>
  );
};

export default Stories;
