import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./card.css";

const Card = ({
  elevation = 1,
  background = "#fff",
  margin = "1rem",
  roundCorner = true,
  children
}) => (
  <div
    className={classNames(`card-container card-${elevation}`, {
      "card-edge": roundCorner
    })}
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
