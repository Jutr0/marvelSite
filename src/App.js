import { Component } from "react";
import { Link, Router } from "@reach/router";

import Details from "./Details";
import SearchParams from "./SearchParams";
import NotFound from "./NotFound";

const params = {
  ts: 1,
  apikey: "0496dd1c25a6148054d36d77a65cfe14",
  hash: "1bc050ca4051e97e6e076c02cd39b807",
  limit: 20,
  offset: 0,
  orderBy: "name",
};

class App extends Component {
  render() {
    return [
      <Link key="linkToHome" to="/">
        <div className="navBarMain">
          <h1 id="homeButton">HOME</h1>
        </div>
      </Link>,
      <div className="container" key="container">
        <Router>
          <NotFound default />
          <SearchParams path="/" params={params} />
          <Details path="/details/:detailsId" params={params} />
        </Router>
      </div>,
    ];
  }
}

export default App;
