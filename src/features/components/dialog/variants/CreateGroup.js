import React from "react";
import { connect } from "react-redux";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";
import { actions as groupActions } from "../../../lib/groups";

import "../dialog.css";

const { createGroup } = groupActions;

const CreateGroup = ({ handleClose, handleSubmit, performSubmit }) => {
  return (
    <React.Fragment>
      <CardHeader>{"Create new group"}</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            label="Name of group"
            component={renderField}
            type="text"
            validate={required}
          />
          <button
            type="submit"
            onClick={e => {
              performSubmit();
              e.preventDefault();
            }}
            className={"hidden-form-button"}
          />
        </form>
      </CardContent>
      <CardActions>
        <Button
          label="SUBMIT"
          color="var(--color-accept)"
          variant="text"
          handleClick={performSubmit}
        />
      </CardActions>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  performSubmit: () => dispatch(submit("createGroup"))
});

export default reduxForm({
  form: "createGroup",
  onSubmit: (values, dispatch) => dispatch(createGroup(values.name)),
  destroyOnUnmount: false
})(
  connect(
    null,
    mapDispatchToProps
  )(CreateGroup)
);
