import React from "react";
import PropTypes from "prop-types";
/* Buttons */
import TextButton from "./TextButton";
import ButtonFilled from "./ButtonFilled";
import ButtonOutlined from "./ButtonOutlined";

const ButtonContainer = ({ variant, ...rest }) => (
  <React.Fragment>
    {variant === "filled" && <ButtonFilled {...rest} />}
    {variant === "outlined" && <ButtonOutlined {...rest} />}
    {variant === "text" && <TextButton {...rest} />}
  </React.Fragment>
);

ButtonContainer.propTypes = {
  variant: PropTypes.string.isRequired
};

export default ButtonContainer;
