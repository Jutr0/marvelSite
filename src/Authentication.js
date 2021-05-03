import LogIn from "./LogIn";
import Register from "./Register";
import LogOut from "./LogOut";
import { auth } from "./firebase";

const Authentication = () => {
  
  console.log('its ressdsnderisngs Broos')
  const user = auth.currentUser;
  const display = user? <LogOut /> : [<LogIn />, <Register />];
  return (
      <div className="authenticationButtons">
        {display}
      </div>
    );
};

export default Authentication;
