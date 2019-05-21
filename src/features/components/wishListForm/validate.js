import React from "react";
import TextInput from "../textInput";

const isValidName = (str) => (
  str.length > 0 && /\s/.test(str[0])
);

const required = value => (isValidName(value) ? undefined : "Required");
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <React.Fragment>
    {type === "text" || type === "number" || type === "date" ? (
      <TextInput
        {...input}
        type={type}
        placeholder={label}
        touched={touched}
        error={error}
        warning={warning}
      />
    ) : (
      <React.Fragment>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span className="helperText">{error}</span>) ||
            (warning && <span className="helperText">{warning}</span>))}
      </React.Fragment>
    )}
  </React.Fragment>
);
export { required };
export default renderField;
