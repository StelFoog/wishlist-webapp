import React from "react";
import { EditIcon } from "../../svgIcon";
import IconButton from "../../iconButton";

const EditButton = ({ toggleEdit }) => (
  <div className="editButton">
    <IconButton handleClick={toggleEdit}>
      <EditIcon color="var(--color-dark)" />
    </IconButton>
  </div>
);

export default EditButton;
