import { Component } from "react";
import { Link } from "@reach/router";

class Character extends Component {
  render() {
    const { name, thumbnail, id } = this.props;
    return (
      <div className="character">
        <Link to={`/details/${id}`} className="characterLink">
          <h1>{name}</h1>
          <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        </Link>
        <br></br>
      </div>
    );
  }
}

export default Character;
