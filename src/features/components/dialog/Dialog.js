import React from "react";

import Card from "../card";
import { NewWishlist, EditItem, CreateItem, CreateGroup } from "./variants";

import "./dialog.css";

const DIALOG_VARIANTS = {
  newWishlist: NewWishlist,
  editItem: EditItem,
  createItem: CreateItem,
  createGroup: CreateGroup
};

const Dialog = ({ variant, showDialog, handleClose, ...rest }) => {
  const DialogVariant = DIALOG_VARIANTS[variant]
    ? DIALOG_VARIANTS[variant]
    : "div";

  return (
    <React.Fragment>
      {showDialog && (
        <div
          id="dialog-container"
          onClick={event => {
            const target = event.target;
            if (target.id === "dialog-container") {
              handleClose();
            }
          }}
        >
          <div className="dialog">
            <Card elevation={5}>
              <DialogVariant handleClose={handleClose} {...rest} />
            </Card>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Dialog;
