import React from "react";
import { connect } from "react-redux";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";
import { actions } from "../../../lib/authentication";

const Invite = ({
  performSubmit,
  handleClose,
  authenticate,
  values,
  ...rest
}) => {
  return (
    <React.Fragment>
      <CardHeader>
        {"A user has invited you to this wishlist/group!"}
      </CardHeader>
      <CardContent>
        {"To get access to this page you must be signed in."}
      </CardContent>
      <CardActions>
        <Button
          label="Login"
          color="green"
          variant="filled"
          handleClick={authenticate}
        />
        <Button
          label="Cancel"
          color="red"
          variant="outlined"
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
)(Invite);
