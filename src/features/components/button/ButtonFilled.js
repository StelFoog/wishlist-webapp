import React from "react";
import "./button.css";

const ButtonFilled = ({ color, label, handleClick }) => (
  <div className="buttonContainer buttonFilledContainer">
    <button
      onClick={handleClick}
      className="buttonFilled"
      style={{ background: color }}
    >
      <span className="buttonLabel">{label}</span>
    </button>
  </div>
);

export default ButtonFilled;
