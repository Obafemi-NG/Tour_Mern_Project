import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { ReactComponent as LoginIcon } from "../../assets/users-solid.svg";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [focus, setFocus] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormValue(initialState);
  };
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  // const handleBlur = () => {
  //   setFocus(true);
  // };

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      label: "Email",
      errorMsg: "Invalid Email Address provided.",
      required: true,
      pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
    },
    {
      id: "password",
      type: "password",
      name: "password",
      label: "Password",
      errorMsg: "Invalid Password provided",
      required: true,
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$",
    },
  ];

  return (
    <div className={styles["login-container"]}>
      <div className={styles["container-header"]}>
        <div className={styles.icon}>
          <LoginIcon />
        </div>
        <h2> Login </h2>
      </div>

      <div className={styles["input-container"]}>
        {inputs.map((input) => (
          <CustomInput key={input.id} onChange={handleChange} {...input} />
        ))}

        {/* <div className={styles["input-section"]}>
          <input
            type="email"
            name="email"
            value={email}
            onBlur={handleBlur}
            required
            focus={focus.toString()}
            onChange={handleChange}
            pattern="[a-z0-9]+@[a-z]+.[a-z]{2,3}"
          />
          <label htmlFor="email"> Email </label>
          {focus && (
            <p className={styles["error-msg"]}>
              {" "}
              Invalid Email Address provided.{" "}
            </p>
          )}
        </div>
        <div className={styles["input-section"]}>
          <input
            type="password"
            name="password"
            value={password}
            onBlur={handleBlur}
            onChange={handleChange}
            focus={focus.toString()}
            required
            pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          />
          <label htmlFor="email"> Password </label>
          {focus && (
            <p className={styles["error-msg"]}>
              {" "}
              Incorrect password provided.{" "}
            </p>
          )}
        </div> */}
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
