import React from "react";
import PropTypes from "prop-types";
/*CSS*/
import "./button.css";
/* Ripple */
import Ripple from "./../ripple";

const ButtonFilled = ({
  color,
  label,
  handleClick,
  fontSize = "1.25rem",
  padding = "1rem 1.5rem"
}) => (
  <div className="buttonContainer buttonFilledContainer">
    <button
      onClick={handleClick}
      className="buttonFilled"
      style={{ background: color, fontSize: fontSize, padding: padding }}
    >
      <Ripple />
      <span className="buttonLabel">{label}</span>
    </button>
  </div>
);

ButtonFilled.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  fontSize: PropTypes.string,
  padding: PropTypes.string
};

export default ButtonFilled;
