import React from "react";

import "./textInput.css";

const TextInput = ({
  placeholder,
  variant = "outlined",
  touched,
  error,
  warning,
  type,
  ...rest
}) => {
  console.log(rest);
  return (
    <div className="textInputContainer">
      <input {...rest} type={type} className={`textInput ${variant}`} />

      <span className="highlight" />
      <span className="textBar" />
      <label>{placeholder}</label>
      {touched &&
        ((error && <span className="helperText">{error}</span>) ||
          (warning && <span className="helperText">{warning}</span>))}
    </div>
  );
};

export default TextInput;
