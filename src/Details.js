import { Redirect, redirectTo } from "@reach/router";
import { useEffect, useState } from "react";
import Comics from "./Comics";
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
        console.log(response);
        console.log("detailsResponse");
        setCharacter(response.data.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
        console.log("detailsError");
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (character === {}) {
    return <h1>Not Found</h1>;
  } else {
    const {
      name,
      thumbnail,
      comics,
      description,
      events,
      id,
      modified,
      series,
      stories,
      urls,
    } = character;
    return (
      <div id="container">
        <div class="deciption">
          <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
          <div className="detailsDescription">
            <h1>{name}</h1>
            <br />
            <hr />
            <br />
            {description}
          </div>
        </div>
        <Comics />
        <div className="storiesSection section">
          <div className="navBar">
            <h1>STORIES</h1>
          </div>
          <div className="storiesList displayList"></div>
        </div>
        <div className="eventsSection section">
          <div className="navBar">
            <h1>events</h1>
          </div>
          <div className="eventsList displayList"></div>
        </div>
        <div className="commentsSection section">
          <div className="navBar">
            <h1>comments</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
