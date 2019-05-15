import React from "react";
/* Components */
import Ripple from "../ripple";
/* CSS */
import "./iconButton.css";

const IconButtonFilled = ({
  handleClick,
  edge = "circle",
  className = "",
  color = "white",
  padding = "0.5rem",
  ripple = true,
  children
}) => (
  <div
    className={`iconButton-${edge} iconButtonContainer iconButtonContainer-filled`}
  >
    <button
      className={`iconButton iconButton-filled iconButton-${edge} ${className}`}
      style={{ background: color, padding: padding }}
      onClick={handleClick}
    >
      {ripple && <Ripple />}
      {children}
    </button>
  </div>
);

export default IconButtonFilled;
