import React from "react";
import classNames from "classnames";
/* CSS */
import "./paper.css";

const Paper = ({
  elevation = 1,
  className = "",
  roundCorner = false,
  transparent = false,
  children
}) => (
  <div
    className={classNames(`paperShadow-${elevation}`, className, {
      paperRounded: roundCorner,
      paperTransparent: transparent
    })}
  >
    {children}
  </div>
);

export default Paper;
