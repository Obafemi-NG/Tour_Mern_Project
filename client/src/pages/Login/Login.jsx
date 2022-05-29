import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { ReactComponent as LoginIcon } from "../../assets/users-solid.svg";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";
import CustomInput from "../../components/CustomInput/CustomInput";
import { login } from "../../redux/features/auth.slice";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const { error, loading } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, toast, navigate }));
    }
  };
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      label: "Email",
      value: email,
      errorMsg: "Invalid Email Address provided.",
      required: true,
      pattern: "[a-z0-9_]+@[a-z]+.[a-z]{2,3}",
    },
    {
      id: "password",
      type: "password",
      name: "password",
      label: "Password",
      value: password,
      errorMsg: "Invalid Password provided",
      required: true,
      pattern: "^(?=.*[0-9])(?=.*[!@#$_%^&*])[a-z0-9!@#$_%^&*]{6,16}$",
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
              Login
            </span>
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
