import React from "react";

const Button = ({ variant = "filled", color, label, handleClick }) => (
  <div className="button-container">
    {variant == "filled" && (
      <button
        style={{ background: color, color: "#fff" }}
        onClick={handleClick}
      >
        {label}
      </button>
    )}
    {variant == "outlined" && (
      <button
        style={{ color: color, background: rgba(255, 255, 255, 0.3) }}
        onClick={handleClick}
      >
        {label}
      </button>
    )}
  </div>
);

export default Button;
