import React from "react";
import PropTypes from "prop-types";
/* Buttons */
import TextButton from "./TextButton";
import ButtonFilled from "./ButtonFilled";
import ButtonOutlined from "./ButtonOutlined";

const BUTTON_TYPES = {
  filled: ButtonFilled,
  outlined: ButtonOutlined,
  text: TextButton
};

const ButtonContainer = ({ variant, ...rest }) => {
  const ButtonType = BUTTON_TYPES[variant] ? BUTTON_TYPES[variant] : "div";
  if (ButtonType === "div")
    console.log(`${variant} is not a valid button variant`);
  return <ButtonType {...rest} />;
};

ButtonContainer.propTypes = {
  variant: PropTypes.string.isRequired
};

export default ButtonContainer;
