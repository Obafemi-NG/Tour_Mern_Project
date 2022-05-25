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
      <form onSubmit={handleSubmit} className={styles["input-container"]}>
        <div className={styles["input-section"]}>
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            pattern="[a-z0-9]+@[a-z]+.[a-z]{2,3}"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className={styles["input-section"]}>
          <label htmlFor="email"> Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="*******"
            pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          />
        </div>
      </form>
      <div className={styles.footer}>
        <div className={styles.cta}>
          <button className={styles.btn}>Login</button>
        </div>
        <p>
          {" "}
          Don't have an account yet?{" "}
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
