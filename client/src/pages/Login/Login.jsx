import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { ReactComponent as LoginIcon } from "../../assets/users-solid.svg";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValue(initialState);
  };
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["container-header"]}>
        <div className={styles.icon}>
          <LoginIcon />
        </div>
        <h2> Login </h2>
      </div>

      <div className={styles["input-container"]}>
        <div className={styles["input-section"]}>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={handleChange}
            pattern="[a-z0-9]+@[a-z]+.[a-z]{2,3}"
          />
          <label htmlFor="email"> Email </label>
        </div>
        <div className={styles["input-section"]}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          />
          <label htmlFor="email"> Password </label>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.cta}>
          <button onClick={handleSubmit} className={styles.btn}>
            Login
          </button>
        </div>
        <p className={styles["footer-text"]}>
          {" "}
          <span className={styles.text}> Don't have an account yet? </span>{" "}
          <Link to="/register">
            {" "}
            <span className={styles.link}> Sign Up </span>{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
