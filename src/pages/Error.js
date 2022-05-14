import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import img from "../assets/images/error.svg";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <main className={styles.error}>
      <Navbar />
      <div>
        <img src={img} className={styles.error_img} alt="not found" />
        <h3>Oh snap...</h3>
        <p>This page does not exist</p>
        <p>
          <Link to="/">back home</Link>
        </p>
      </div>
    </main>
  );
};

export default Error;
