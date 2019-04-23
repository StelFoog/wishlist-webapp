import React from "react";
import "./button.css";
/* Ripple */
import Ripple from "./../ripple";

const TextButton = ({ color, label, handleClick, fontSize = "1.25rem" }) => (
  <div className="buttonContainer buttonTextContainer">
    <button
      onClick={handleClick}
      className="buttonText"
      style={{
        color: color,
        borderColor: color,
        fontSize: fontSize
      }}
    >
      <Ripple />
      <span>{label}</span>
    </button>
  </div>
);

export default TextButton;
