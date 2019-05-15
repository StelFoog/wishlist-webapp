import React from "react";

const CardHeader = ({ children, className }) => (
  <div className={`card-header ${className}`}>
    <h2>{children}</h2>
  </div>
);

export default CardHeader;
