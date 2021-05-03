import LogIn from "./LogIn";
import Register from "./Register";
import LogOut from "./LogOut";

const Authentication = (props) => {
  const user = props.user;
  const display = user ? <LogOut /> : [<LogIn />, <Register />];
  return (
      <div className="authenticationButtons">
        {display}
      </div>
    );
};

export default Authentication;
