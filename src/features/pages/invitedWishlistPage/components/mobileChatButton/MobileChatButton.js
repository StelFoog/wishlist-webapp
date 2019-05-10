import React from "react";

import { ChatIcon } from "../../../../components/svgIcon";
import IconButton from "../../../../components/iconButton";
import "./mobileChatButton.css";

const MobileChatButton = ({ toggleChatWindow }) => (
  <div className="mobileChatButtonContainer">
    <IconButton
      variant="filled"
      color="var(--color-primary)"
      padding="0.75rem"
      handleClick={toggleChatWindow}
    >
      <ChatIcon size={35} />
    </IconButton>
  </div>
);

export default MobileChatButton;
