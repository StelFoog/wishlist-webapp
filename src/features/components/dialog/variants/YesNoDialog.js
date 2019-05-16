import React from "react";
import { connect } from "react-redux";

import Button from "../../button";
import { CardHeader, CardActions } from "../../card";
import { selectors } from "../";

const YesNoDialog = ({ handleClose, value }) => {
  const { title, onYes } = value;
  return(
    <React.Fragment>
      <CardHeader>{title}</CardHeader>
      <CardActions>
        <Button
          variant="text"
          label="No"
          color="red"
          handleClick={handleClose}
        />
        <Button
          variant="filled"
          label="Yes"
          color="#003f9f"
          handleClick={() => {
            onYes()
            handleClose()
          }}
        />
      </CardActions>
    </React.Fragment>
  );
}

const mapStateToProps = () => {
  const getDialogValues = selectors.getDialogValuesState();
  return state => ({
    value: getDialogValues(state)
  });
}

export default connect(
  mapStateToProps,
  null
)(YesNoDialog);
