import React from "react";
import { DeleteIcon } from "../../../../components/svgIcon";
import IconButton from "../../../../components/iconButton";

const DeleteButton = ({ uid, deleteWishlist, user }) => (
  <IconButton handleClick={() => deleteWishlist(uid, user)}>
    <DeleteIcon color="var(--color-error)" />
  </IconButton>
);

export default DeleteButton;
