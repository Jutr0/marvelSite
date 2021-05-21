import { Link } from "@reach/router";

import { signInWithGoogle } from "../utils/firebase";

const LogIn = () => {
  return (
    <Link to="/login">
      <h2>Log In</h2>
    </Link>
  );
};
export default LogIn;

export const LogInPage = () => {
  return <button onClick={signInWithGoogle}>Log in via Google</button>;
};
