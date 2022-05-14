import { useContext } from "react";
import main from "../assets/images/reading.svg";
import AuthContext from "../store/auth-context";
import styles from "./Landing.module.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Landing = () => {
  const authCtxt = useContext(AuthContext);
  return (
    <main>
      <Navbar></Navbar>
      <div className="container page">
        <div>
          <h1>
            Welcome to
            <br />
            <span> the book app</span>
          </h1>
          {!authCtxt.isLoggedIn && (
            <div className={styles.btn_container}>
              <Link to="/auth" className="btn btn-hero">
                Login/Register
              </Link>
            </div>
          )}
          {authCtxt.isLoggedIn && (
            <div>
              <h2>You're logged in!</h2>
            </div>
          )}
        </div>
        <img
          src={main}
          alt="Reading a beautiful book"
          className={styles.main_img}
        />
        <div className={styles.hero_bckr}></div>
      </div>
    </main>
  );
};

export default Landing;
