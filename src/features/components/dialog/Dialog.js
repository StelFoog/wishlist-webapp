import React from "react";

import Card, { CardContent, CardHeader } from "../card";

import "./dialog.css";

function isObj(v) {
  return typeof v == "object";
}

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
            {content.header && (
              <CardHeader className="dialog-header">
                {content.header}
              </CardHeader>
            )}
            <CardContent>{content.body ? content.body : content}</CardContent>
          </Card>
        </div>
      </div>
    )}
  </React.Fragment>
);

export default Dialog;
