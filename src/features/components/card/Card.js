import React from "react";
import PropTypes from "prop-types";
import "./card.css";

import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import CardMedia from "./CardMedia";

const Card = ({
  elevation = 1,
  padding = "2rem",
  background = "#fff",
  margin = "1rem",
  media,
  mediaHeight,
  title,
  children
}) => (
  <div
    className={`card-container card-${elevation}`}
    style={{ padding: padding, background: background, margin: margin }}
  >
    {media && (
      <CardMedia media={media} mediaHeight={mediaHeight} padding={padding} />
    )}
    {title && <CardHeader title={title} />}
    <CardContent children={children} />
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
