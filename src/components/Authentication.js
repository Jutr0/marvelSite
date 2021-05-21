import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import LogOut from "./LogOut";

const Authentication = ({ user, loading }) => {
  //console.log("its ressdssnderisngs Broos");
  if (loading) return null;
  //console.log("auth user: ", { user });
  const display = user ? (
    <LogOut />
  ) : (
    [<LogIn key="login" />, <Register key="register" />]
  );
  return <div className="authenticationButtons">{display}</div>;
};

export default Authentication;
