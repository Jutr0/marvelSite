import { useEffect, useState } from "react";
import Comics from "./Comics";
import Comments from "./Comments";
import Events from "./Events";
import Stories from "./Stories";
import "./style.css";

const axios = require("axios");

const Details = (props) => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `http://gateway.marvel.com/v1/public/characters/${props.detailsId}`,
        {
          params: {
            ts: props.params.ts,
            apikey: props.params.apikey,
            hash: props.params.hash,
          },
        }
      )
      .then((response) => {
       //console.log(response);
        //console.log("detailsResponse");
        setCharacter(response.data.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
        console.log("detailsError");
      })
      .then(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (character === {}) {
    return <h1>Not Found</h1>;
  } else {
    const { name, thumbnail, comics, description, events, stories } = character;
    return (
      <div id="container">
        <div className="deciption">
          <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
          <div className="detailsDescription">
            <h1>{name}</h1>
            <br />
            <hr />
            <br />
            {description}
          </div>
        </div>
        <Comics comics={comics.items} />
        <Stories stories={stories.items} />
        <Events events={events.items} />
        <Comments id={props.detailsId} />
      </div>
    );
  }
};

export default Details;
