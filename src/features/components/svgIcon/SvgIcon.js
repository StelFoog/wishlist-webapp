import React from "react";
import PropTypes from "prop-types";

import Ripple from "../ripple";

const SvgIcon = ({
  children,
  className = "",
  ripple = false,
  handleCLick = null
}) => (
  <div className={`svgIcon ${className}`} onClick={handleCLick}>
    {children}
    {ripple && <Ripple />}
  </div>
);

SvgIcon.propTypes = {
  children: PropTypes.node.isRequired
};

export default SvgIcon;
