import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { ReactComponent as LoginIcon } from "../../assets/users-solid.svg";
import { SpinnerCircular } from "spinners-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signUp } from "../../redux/features/auth.slice";

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
      name: "firstName",
      label: "First Name",
      value: firstName,
      type: "text",
      required: true,
      errorMsg: "Please provide a valid First Name",
      pattern: "[a-zA-Z]{2,}",
    },
    {
      id: "lastName",
      name: "lastName",
      label: "Last Name",
      value: lastName,
      type: "text",
      required: true,
      errorMsg: "Please provide a valid Last Name",
      pattern: "[a-zA-Z]{2,}",
    },
    {
      id: "email",
      name: "email",
      label: "E-mail",
      value: email,
      type: "email",
      required: true,
      errorMsg: "Please provide a valid E-mail address.",
      pattern: "[a-z0-9_]+@[a-z]+.[a-z]{2,3}",
    },
    {
      id: "password",
      name: "password",
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
      name: "confirmPassword",
      label: "Confirm Password",
      value: confirmPassword,
      type: "password",
      required: true,
      errorMsg: "Password does not match!",
      pattern: "^(?=.*[0-9])(?=.*[!@#$_%^&*])[a-z0-9!@#$_%^&*]{6,16}$",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords provided does not match!");
    }
    if (firstName && lastName && email && password && confirmPassword) {
      dispatch(signUp({ formValue, toast, navigate }));
    }
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
