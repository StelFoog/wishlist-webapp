import React from "react";

import Card from "../card";

import {
  NewWishlist,
  EditItem,
  CreateItem,
  CreateGroup,
  AddMember,
  Share,
  NoLogin,
  Invite,
  YesNoDialog,
  CreateGroupItem,
  EditGroupItem,
  HelpPage,
  ErrorDialog
} from "./variants";

import "./dialog.css";

const DIALOG_VARIANTS = {
  newWishlist: NewWishlist,
  editItem: EditItem,
  createItem: CreateItem,
  createGroupItem: CreateGroupItem,
  editGroupItem: EditGroupItem,
  createGroup: CreateGroup,
  addMember: AddMember,
  share: Share,
  noLogin: NoLogin,
  invite: Invite,
  yesNo: YesNoDialog,
  help: HelpPage,
  error: ErrorDialog
};

const Dialog = ({ variant, showDialog, handleClose, values, ...rest }) => {
  const DialogVariant = DIALOG_VARIANTS[variant]
    ? DIALOG_VARIANTS[variant]
    : "div";
  const onClose = values.onClose
    ? () => {
      handleClose();
      values.onClose();
    }
    : handleClose;
  return (
    <React.Fragment>
      {showDialog && (
        <div
          id="dialog-container"
          onClick={event => {
            const target = event.target;
            if (target.id === "dialog-container") {
              onClose();
            }
          }}
        >
          <div className="dialog">
            <Card elevation={5}>
              <DialogVariant handleClose={onClose} {...rest} />
            </Card>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Dialog;
