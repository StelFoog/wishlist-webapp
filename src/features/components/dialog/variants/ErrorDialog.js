import React from "react";
import { connect } from "react-redux";

import Paper from "../../paper";
import Button from "../../button";
import { CardHeader, CardContent, CardActions } from "../../card";

import { selectors } from "../";

const ErrorDialog = ({ handleClose, value }) => {
  const { type, error } = value;
  return(
    <React.Fragment>
      <CardHeader>Something went wrong! :(</CardHeader>
      { type || "" }
      <CardContent>
        <Paper>
          { error &&
            (<h2>{ error.code || "" }</h2>)
            (error.message || error)
          }
        </Paper>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          label="OK"
          color="var(--color-error)"
          handleClick={handleClose}
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
)(ErrorDialog);
