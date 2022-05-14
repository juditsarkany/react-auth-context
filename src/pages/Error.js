import { Link } from "react-router-dom";
import img from "../assets/images/error.svg";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <main className={styles.error}>
      <div>
        <img src={img} alt="not found" />
        <h3>Oh snap...</h3>
        <p>This page does not exist</p>
        <Link to="/">back home</Link>
      </div>
    </main>
  );
};

export default Error;
