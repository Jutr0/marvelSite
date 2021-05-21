import { useEffect, useState } from "react";
import Comics from "../components/Comics";
import Comments from "../components/Comments";
import Events from "../components/Events";
import Stories from "../components/Stories";
import { ISearchParams, IApiResponse, ICharacterData } from "../utils/customTypes";
import "../css/style.css";

const axios = require("axios");

const Details = (props:{params:ISearchParams, detailsId:number}) => {
  const [character, setCharacter] = useState<ICharacterData | null>(null);
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
      .then((response:IApiResponse) => {
        //console.log(response);
        //console.log("detailsResponse");
        setCharacter(response.data.data.results[0]);
      })
      .catch((error:Error) => {
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
  } else if (character === null ) {
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
