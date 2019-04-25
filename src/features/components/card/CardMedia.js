import React from "react";

const CardMedia = ({ media, mediaHeight = "100px" }) => (
  <div
    className="card-media"
    style={{
      backgroundImage: `url(${media})`,
      height: mediaHeight
    }}
  />
);

export default CardMedia;
