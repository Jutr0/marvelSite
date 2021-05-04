import LogIn from "./LogIn";
import Register from "./Register";
import LogOut from "./LogOut";

const Authentication = ({user, loading}) => {
  console.log("its ressdssnderisngs Broos");
  if (loading) return null;
  console.log("auth user: ", {user})
  const display = user ? <LogOut /> : [<LogIn />, <Register />];
  return <div className="authenticationButtons">{display}</div>;
};

export default Authentication;
