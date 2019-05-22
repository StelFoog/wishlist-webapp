import React from "react";
import PropTypes from "prop-types";
import "./button.css";
/* Ripple */
import Ripple from "../ripple";

const TextButton = ({
  color,
  label,
  handleClick,
  className = "",
  fontSize = "1.25rem",
  padding = "1rem 1.5rem",
  borderRadius = "var(--border-radius)"
}) => (
  <div className="buttonContainer buttonTextContainer">
    <button
      onClick={handleClick}
      className={`buttonText ${className}`}
      style={{
        color,
        borderColor: color,
        padding,
        fontSize,
        borderRadius
      }}
    >
      <Ripple />
      <span>{label}</span>
    </button>
  </div>
);

TextButton.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  fontSize: PropTypes.string,
  padding: PropTypes.string
};

export default TextButton;
