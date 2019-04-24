import React from "react";
import PropTypes from "prop-types";
import "./card.css";

const Card = ({
  elevation = 1,
  background = "#fff",
  margin = "1rem",
  children
}) => (
  <div
    className={`card-container card-${elevation}`}
    style={{ background: background, margin: margin }}
  >
    {children}
  </div>
);

Card.propTypes = {
  elevation: PropTypes.number,
  children: PropTypes.node.isRequired,
  padding: PropTypes.string,
  background: PropTypes.string,
  margin: PropTypes.string
};

export default Card;
