import { useRef, useContext } from "react";
import styles from "./Profile.module.css";
import Navbar from "../components/Navbar";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const newPasswordInputRef = useRef();
  const authCtxt = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBI5UWdEPj6tyzgCLrqI_eBU0D-prnZlJQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtxt.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {});
  };
  return (
    <main>
      <Navbar></Navbar>
      <section className={styles.profile}>
        <h1>Your User Profile</h1>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="new-password" minLength="7">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              ref={newPasswordInputRef}
            />
          </div>
          <div className={styles.action}>
            <button className="btn btn-block">Change Password</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Profile;
