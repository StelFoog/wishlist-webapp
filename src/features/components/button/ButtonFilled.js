import React from "react";
import "./button.css";

/* Ripple */
import Ripple from "./../ripple";

const ButtonFilled = ({ color, label, handleClick }) => (
  <div className="buttonContainer buttonFilledContainer">
    <button
      onClick={handleClick}
      className="buttonFilled"
      style={{ background: color }}
    >
      <Ripple />
      <span className="buttonLabel">{label}</span>
    </button>
  </div>
);

export default ButtonFilled;
