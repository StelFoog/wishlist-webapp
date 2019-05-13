import React from "react";
import { PlusIcon } from "../../../../components/svgIcon";
import Ripple from "../../../../components/ripple";

const AddUser = () => (
  <div className="addUserButtonContainer memberCard">
    <Ripple />
    <PlusIcon />
    <span>Add user</span>
  </div>
);

export default AddUser;
