import React, { useState } from "react";
import styles from "./Register.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { ReactComponent as LoginIcon } from "../../assets/users-solid.svg";
import { SpinnerCircular } from "spinners-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(INITIAL_STATE);
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const inputs = [
    {
      id: "firstName",
      label: "First Name",
      value: firstName,
      type: "text",
      required: true,
      errorMsg: "Please provide a valid First Name",
      pattern: "[a-zA-Z]",
    },
    {
      id: "lastName",
      label: "Last Name",
      value: lastName,
      type: "text",
      required: true,
      errorMsg: "Please provide a valid Last Name",
      pattern: "[a-zA-Z]",
    },
    {
      id: "email",
      label: "E-mail",
      value: email,
      type: "email",
      required: true,
      errorMsg: "Please provide a valid E-mail address.",
      pattern: "[a-z0-9_]+@[a-z]+.[a-z]{2,3}",
    },
    {
      id: "password",
      label: "Password",
      value: password,
      type: "password",
      required: true,
      errorMsg:
        "Password must contain letters, numbers and at least one of these special characters (!@#$_%^&*) ",
      pattern: "^(?=.*[0-9])(?=.*[!@#$_%^&*])[a-z0-9!@#$_%^&*]{6,16}$",
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      value: confirmPassword,
      type: "password",
      required: true,
      errorMsg: "Password does not match!",
      pattern: "^(?=.*[0-9])(?=.*[!@#$_%^&*])[a-z0-9!@#$_%^&*]{6,16}$",
    },
  ];
  const { loading } = useSelector((state) => ({ ...state.auth }));
  const handleChange = (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles["register-container"]}>
      <div className={styles["container-header"]}>
        <div className={styles.icon}>
          <LoginIcon />
        </div>
        <h2 className={styles["sign-up"]}> Sign Up </h2>
      </div>

      <div className={styles["input-container"]}>
        {inputs.map((input) => (
          <CustomInput
            key={input.id}
            onChange={handleChange}
            {...input}
            value={input.value}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.cta}>
          <button onClick={handleSubmit} className={styles.btn}>
            <span className={styles.content}>
              {loading && (
                <span className={styles.spinner}>
                  {" "}
                  <SpinnerCircular
                    size="20"
                    color="#ffffff"
                    thickness={150}
                  />{" "}
                </span>
              )}
              Sign Up
            </span>
          </button>
        </div>
        <p className={styles["footer-text"]}>
          {" "}
          <span className={styles.text}> Don't have an account yet? </span>{" "}
          <Link to="/login">
            {" "}
            <span className={styles.link}> Sign In </span>{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
