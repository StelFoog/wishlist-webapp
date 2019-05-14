import React from "react";
import { EditIcon } from "../../../../components/svgIcon";
import IconButton from "../../../../components/iconButton";

const EditButton = ({ toggleEdit }) => (
  <div className="editButton">
    <IconButton handleClick={toggleEdit}>
      <EditIcon color="var(--color-dark)" />
    </IconButton>
  </div>
);

export default EditButton;
