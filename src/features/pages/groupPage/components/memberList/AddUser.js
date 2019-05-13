import React from "react";
import { PlusIcon } from "../../../../components/svgIcon";
import Ripple from "../../../../components/ripple";

const AddUser = ({ openForm, uid }) => (
  <div
    className="addUserButtonContainer memberCard"
    onClick={() => openForm(uid)}
  >
    <Ripple />
    <PlusIcon />
    <span>Add user</span>
  </div>
);

export default AddUser;
