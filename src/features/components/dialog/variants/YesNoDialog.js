import React from "react";

import Button from "../../button";
import { CardHeader, CardActions } from "../../card";

const YesNoDialog = ({ handleClose, values }) => {
  const { title, onYes } = values;
  return(
    <React.Fragment>
      <CardHeader>{title}</CardHeader>
      <CardActions>
        <Button
          variant="filled"
          label="No"
          color="red"
          handleClick={handleClose}
        />
        <Button
          variant="filled"
          label="Yes"
          color="green"
          handleClick={() => {
            onYes()
            handleClose()
          }}
        />
      </CardActions>
    </React.Fragment>
  );
}

export default YesNoDialog;
