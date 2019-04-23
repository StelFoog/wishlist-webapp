import React from "react";
import "./button.css";
/* Ripple */
import Ripple from "./../ripple";

const ButtonFilled = ({ color, label, handleClick, fontSize = "1.25rem" }) => (
  <div className="buttonContainer buttonFilledContainer">
    <button
      onClick={handleClick}
      className="buttonFilled"
      style={{ background: color, fontSize: fontSize }}
    >
      <Ripple />
      <span className="buttonLabel">{label}</span>
    </button>
  </div>
);

export default ButtonFilled;
