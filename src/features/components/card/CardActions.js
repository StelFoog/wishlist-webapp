import React from "react";

const CardActions = ({ children, className = "" }) => (
  <div className={`card-actions ${className}`}>{children}</div>
);

export default CardActions;
