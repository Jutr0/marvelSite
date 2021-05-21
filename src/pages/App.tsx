import { Component } from "react";
import { Link, Router } from "@reach/router";

import Details from "./Details";
import SearchParams from "../components/SearchParams";
import NotFound from "../components/NotFound";
import Authentication from "../components/Authentication";
import { LogInPage } from "./LogIn";
import { auth, createUserProfileDocument } from "../utils/firebase";
import { Unsubscribe } from "firebase/auth";
import { ISearchParams, IUser } from "../utils/customTypes";

const params:ISearchParams = {
  ts: 1,
  apikey: "0496dd1c25a6148054d36d77a65cfe14",
  hash: "1bc050ca4051e97e6e076c02cd39b807",
  limit: 20,
  offset: 0,
  orderBy: "name",
};
class App extends Component <{},{user: IUser | null | undefined, loading: boolean}>{
  state = {
    user: null,
    loading: true,
  };

  unsubscribeFromAuth:Unsubscribe | null = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user, loading: false });
      console.log("app user: ", { user });
    });
  };
  componentWillUnmount = () => {
    if(this.unsubscribeFromAuth!==null)
    this.unsubscribeFromAuth();
  };

  render() {
    return [
      <div className="navBarMain">
        <Link key="linkToHome" to="/">
          <h1 id="homeButton">HOME</h1>
        </Link>
        <Authentication user={this.state.user} loading={this.state.loading}/>
      </div>,
      <div className="container" key="container">
        <Router>
          <NotFound default/>
          <LogInPage path="/login" />
          <SearchParams path="/" params={params} />
          <Details path="/details/:detailsId" params={params} />
        </Router>
      </div>,
    ];
  }
}

export default App;
