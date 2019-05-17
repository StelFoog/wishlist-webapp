import React from "react";
import { DeleteIcon, LeaveIcon } from "../../svgIcon";
import IconButton from "../../iconButton";

const DeleteButton = ({ uid, deleteObject, leave, user, isOwner = true }) => (
  <React.Fragment>
    {isOwner ? (
      <IconButton handleClick={() => deleteObject(uid, user)}>
        <DeleteIcon color="var(--color-error)" />
      </IconButton>
    ) : (
      <IconButton handleClick={() => leave(uid, user)}>
        <LeaveIcon color="var(--color-error)" />
      </IconButton>
    )}
  </React.Fragment>
);

export default DeleteButton;
