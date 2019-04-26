import React from "react";

import Card, { CardContent, CardHeader } from "../card";

import "./dialog.css";

const Dialog = ({ content, showDialog, closeDialog }) => (
  <React.Fragment>
    {showDialog && (
      <div
        id="dialog-container"
        onClick={event => {
          const target = event.target;
          if (target.id === "dialog-container") {
            closeDialog();
          }
        }}
      >
        <div className="dialog">
          <Card elevation={5}>
            <CardHeader className="dialog-header">This is a dialog</CardHeader>
            <CardContent>{content}</CardContent>
          </Card>
        </div>
      </div>
    )}
  </React.Fragment>
);

export default Dialog;
