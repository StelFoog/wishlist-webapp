import React from "react";
import IconButton from "../../../../components/iconButton";
import { GroupIcon } from "../../../../components/svgIcon";

const ShowMemberListButton = ({ showMemberListToggle }) => (
  <IconButton
    handleClick={showMemberListToggle}
    variant="filled"
    color="var(--color-primary)"
  >
    <GroupIcon size={50} />
  </IconButton>
);

export default ShowMemberListButton;
