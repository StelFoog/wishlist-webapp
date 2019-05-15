import React from "react";
/*Components*/
import IconButtonFilled from "./IconButtonFilled";
import IconButtonOutlined from "./IconButtonOutlined";
import IconButtonClear from "./IconButtonClear";

const BUTTON_TYPES = {
  filled: IconButtonFilled,
  outlined: IconButtonOutlined,
  clear: IconButtonClear
};

const IconButtonContainer = ({ variant, ...rest }) => {
  const ButtonType = BUTTON_TYPES[variant]
    ? BUTTON_TYPES[variant]
    : IconButtonClear;

  return <ButtonType {...rest} />;
};

export default IconButtonContainer;
