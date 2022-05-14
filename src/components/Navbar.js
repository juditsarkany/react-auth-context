import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import AuthContext from "../store/auth-context";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const authCtxt = useContext(AuthContext);

  const isLoggedIn = authCtxt.isLoggedIn;

  const logoutHandler = () => {
    authCtxt.logout();
  };
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo className="logo"></Logo>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
