import React, { useState } from "react";
import styles from "./CustomInput.module.css";

const CustomInput = ({ onChange, value, label, errorMsg, ...otherProps }) => {
  const [focus, setFocus] = useState(false);
  const onBlurHandler = () => {
    setFocus(true);
  };
  return (
    <div className={styles["input-section"]}>
      <input
        onBlur={onBlurHandler}
        onChange={onChange}
        value={value}
        focus={focus.toString()}
        {...otherProps}
      />
      <label>{label}</label>
      {focus && <p className={styles["error-msg"]}>{errorMsg}</p>}
    </div>
  );
};

export default CustomInput;
