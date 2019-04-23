import React from "react";
import "./button.css";

const ButtonOutlined = ({ color, label, handleClick }) => (
  <div className="buttonContainer buttonOutlinedContainer">
    <button
      onClick={handleClick}
      className="buttonOutlined"
      style={{
        color: color,
        borderColor: color
      }}
    >
      <span>{label}</span>
    </button>
  </div>
);

export default ButtonOutlined;
