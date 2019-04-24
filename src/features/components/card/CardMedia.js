import React from "react";

const CardMedia = ({ media, padding, mediaHeight = "100px" }) => (
  <div
    className="card-media"
    style={{
      margin: `-${padding} -${padding} 0 -${padding}`,
      backgroundImage: `url(${media})`,
      height: mediaHeight
    }}
  />
);

export default CardMedia;
