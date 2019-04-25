import React from "react";
import PropTypes from "prop-types";
/* CSS */
import "./button.css";
/* Ripple */
import Ripple from "./../ripple";

const ButtonOutlined = ({
  color,
  label,
  handleClick,
  className,
  colorOutline = true,
  fontSize = "1.25rem",
  padding = "1rem 1.5rem"
}) => (
  <div className="buttonContainer buttonOutlinedContainer">
    <button
      onClick={handleClick}
      className={`buttonOutline ${className}`}
      style={{
        color: color,
        fontSize: fontSize,
        padding: padding,
        boxShadow: colorOutline
          ? "inset 0px 0px 0px 0.123rem ".concat(color)
          : "inset 0px 0px 0px 0.123rem #7f7f7f"
      }}
    >
      <Ripple />
      <span>{label}</span>
    </button>
  </div>
);

ButtonOutlined.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  colorEdge: PropTypes.bool,
  fontSize: PropTypes.string,
  padding: PropTypes.string
};

export default ButtonOutlined;
