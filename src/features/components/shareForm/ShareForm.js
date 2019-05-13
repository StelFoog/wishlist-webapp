import React from "react";
import { Field, reduxForm } from "redux-form";

const renderField = ({input,
                      name,
                      type,
                      handleSearch 
}) => {
  if(input.value.length >= 3)
    handleSearch(input.value);
  return(
    <div>
      <label>{name}</label>
      <input {...input} type={type} />
    </div>
  );
}


export default renderField;
