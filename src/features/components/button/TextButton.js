import React from "react";
import "./button.css";

import Ripple from "./../ripple";

const TextButton = ({ color, label, handleClick }) => (
  <div className="buttonContainer buttonTextContainer">
    <button
      onClick={handleClick}
      className="buttonText"
      style={{
        color: color,
        borderColor: color
      }}
    >
      <Ripple />
      <span>{label}</span>
    </button>
  </div>
);

export default TextButton;
