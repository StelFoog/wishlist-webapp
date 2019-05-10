import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const EmojiSelector = ({ onSelect }) => (
  <React.Fragment>
    <Picker
      set="emojione"
      title="Pick your emoji…"
      emoji="point_up"
      onSelect={onSelect}
      style={{ position: "absolute", bottom: "45px", right: "20px" }}
    />
  </React.Fragment>
);

export default EmojiSelector;
