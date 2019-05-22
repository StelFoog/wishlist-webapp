import React from "react";
import { connect } from "react-redux";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";
import { actions } from "../../../lib/authentication";

const NoLogin = ({
  performSubmit,
  handleClose,
  authenticate,
  values,
  ...rest
}) => {
  return (
    <React.Fragment>
      <CardHeader>{"You must be logged in to access this page."}</CardHeader>
      <CardActions>
        <Button
          label="Login"
          color="var(--color-accept)"
          variant="text"
          handleClick={authenticate}
        />
        <Button
          label="Cancel"
          color="var(--color-error)"
          variant="text"
          handleClick={handleClose}
        />
      </CardActions>
    </React.Fragment>
  );
};

const { authenticateFacebook } = actions;
const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticateFacebook())
});

export default connect(
  null,
  mapDispatchToProps
)(NoLogin);
