import React from "react";
import "./button.css";

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
      <span>{label}</span>
    </button>
  </div>
);

export default TextButton;
