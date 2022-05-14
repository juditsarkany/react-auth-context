import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/auth-context";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import styles from "./Auth.module.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtxt = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      toast.error("Please fill out all the fields");
    }
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBI5UWdEPj6tyzgCLrqI_eBU0D-prnZlJQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBI5UWdEPj6tyzgCLrqI_eBU0D-prnZlJQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtxt.login(data.idToken);
        navigate("/profile");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <main>
      <Navbar />
      <section className={styles.auth}>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <form className={styles.register} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              minLength="7"
              ref={passwordInputRef}
            />
          </div>
          <div className={styles.actions}>
            <button className="btn btn-block" disabled={isLoading}>
              {isLogin ? "Login" : "Create Account"}
            </button>
            <button
              type="button"
              className={styles.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AuthForm;
