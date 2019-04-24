import React from "react";
import "./button.css";
/* Ripple */
import Ripple from "./../ripple";

const ButtonOutlined = ({
  color,
  label,
  handleClick,
  fontSize = "1.25rem",
  padding = "1rem 1.5rem"
}) => (
  <div className="buttonContainer buttonOutlinedContainer">
    <button
      onClick={handleClick}
      className="buttonOutlined"
      style={{
        color: color,
        fontSize: fontSize,
        padding: padding,
        boxShadow: "inset 0px 0px 0px 0.123rem ".concat(color)
      }}
    >
      <Ripple />
      <span>{label}</span>
    </button>
  </div>
);

export default ButtonOutlined;
