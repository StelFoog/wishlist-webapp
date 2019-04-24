import React from "react";

import "./card.css";

const Card = ({ elevation = 2, children }) => (
  <div className={`card-container card-${elevation}`}>{children}</div>
);

export default Card;
