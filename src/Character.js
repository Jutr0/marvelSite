import { Component } from "react";
import { Link } from "@reach/router";
import "./main.css";

class Character extends Component {
  render() {
    const { name, thumbnail, id } = this.props;
    const bgImg = `url("${thumbnail.path}.${thumbnail.extension}")`;
    return (
      <Link to={`/details/${id}`} className="result">
        <div className="resultImg" style={{ backgroundImage: bgImg }}></div>
        <span className="resultName">{name}</span>
      </Link>
    );
  }
}

export default Character;
