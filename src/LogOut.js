import { Link } from "@reach/router";
import { logout } from "./firebase";

const LogOut = () => {
  return (
    <Link to="/">
      <h2 onClick={logout}>Log Out</h2>
    </Link>
  );
};
export default LogOut;
