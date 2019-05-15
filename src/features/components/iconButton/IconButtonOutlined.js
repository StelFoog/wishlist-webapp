import React from "react";
/* Components */
import Ripple from "../ripple";
/* CSS */
import "./iconButton.css";

const IconButtonOutlined = ({
  handleClick,
  edge = "circle",
  className = "",
  color = "white",
  padding = "0.5rem",
  colorOutline = true,
  ripple = true,
  children
}) => (
  <div className={`iconButton-${edge} iconButtonContainer`}>
    <button
      className={`iconButton iconButton-outlined iconButton-${edge} ${className}`}
      style={{
        padding: padding,
        boxShadow: colorOutline
          ? `inset 0px 0px 0px 0.12rem ${color}`
          : `inset 0px 0px 0px 0.12rem #7f7f7f`
      }}
      onClick={handleClick}
    >
      {ripple && <Ripple />}
      {children}
    </button>
  </div>
);

export default IconButtonOutlined;
