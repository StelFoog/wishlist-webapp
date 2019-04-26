import React from "react";
/* Components */
import Ripple from "../ripple";
/* CSS */
import "./iconButton.css";

const IconButtonClear = ({
  handleClick,
  edge = "circle",
  className = "",
  padding = "0.5rem",
  ripple = true,
  children
}) => (
  <div className={`iconButton-${edge} iconButtonContainer`}>
    <button
      className={`iconButton iconButton-clear iconButton-${edge} ${className}`}
      style={{
        padding: padding
      }}
      onClick={handleClick}
    >
      {ripple && <Ripple />}
      {children}
    </button>
  </div>
);

export default IconButtonClear;
