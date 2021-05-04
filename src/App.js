import { Component } from "react";
import { Link, Router } from "@reach/router";

import Details from "./Details";
import SearchParams from "./SearchParams";
import NotFound from "./NotFound";
import Authentication from "./Authentication";
import { LogInPage } from "./LogIn";
import { auth, createUserProfileDocument } from "./firebase";

const params = {
  ts: 1,
  apikey: "0496dd1c25a6148054d36d77a65cfe14",
  hash: "1bc050ca4051e97e6e076c02cd39b807",
  limit: 20,
  offset: 0,
  orderBy: "name",
};
class App extends Component {
    state = {
      user:null,
      loading:true
    }

  unsubscribeFromAuth = null;

  componentDidMount= async()=>{
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      const user = await createUserProfileDocument(userAuth);
      this.setState({user, loading:false});
      console.log("app user: ",{user});
      
    })
  }
  componentWillUnmount=()=>{
    this.unsubscribeFromAuth();
  }

  render() {
    return [
      <div className="navBarMain">
        <Link key="linkToHome" to="/">
          <h1 id="homeButton">HOME</h1> 
        </Link>
        <Authentication user={this.state.user} />
      </div>,
      <div className="container" key="container">
        <Router>
          <NotFound default />
          <LogInPage path="/login"/>
          <SearchParams path="/" params={params} />
          <Details path="/details/:detailsId" params={params} />
        </Router>
      </div>
    ];
  }
}

export default App;
