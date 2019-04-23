import React from "react";
/* Buttons */
import TextButton from "./TextButton";
import ButtonFilled from "./ButtonFilled";
import ButtonOutlined from "./ButtonOutlined";
/* Ripple */
import Ripple from "./../ripple";
const ButtonContainer = ({ variant, ...rest }) => (
  <React.Fragment>
    {variant === "filled" && <ButtonFilled {...rest} />}
    {variant === "outlined" && <ButtonOutlined {...rest} />}
    {variant === "text" && <TextButton {...rest} />}
  </React.Fragment>
);

export default ButtonContainer;
