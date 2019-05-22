import React from "react";

import { ChatIcon } from "../../../svgIcon";
import IconButton from "../../../iconButton";
import "./mobileChatButton.css";

const MobileChatButton = ({ toggleChatWindow }) => (
  <div className="mobileChatButtonContainer">
    <IconButton
      variant="filled"
      color="var(--color-primary)"
      handleClick={toggleChatWindow}
    >
      <ChatIcon size={40} />
    </IconButton>
  </div>
);

export default MobileChatButton;
