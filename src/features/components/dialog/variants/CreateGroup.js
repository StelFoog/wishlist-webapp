import React from "react";
import { connect } from "react-redux";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";
import { actions as groupActions } from "../../../lib/groups";

const { createGroup } = groupActions;

const CreateGroup = ({ performSubmit }) => {
  return (
    <React.Fragment>
      <CardHeader>{"Create new group"}</CardHeader>
      <CardContent>
        <form onSubmit={performSubmit}>
          <Field
            name="name"
            label="Name of group"
            component={renderField}
            type="text"
            validate={required}
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
  onSubmit: (values, dispatch) => dispatch(createGroup(values.name))
})(
  connect(
    null,
    mapDispatchToProps
  )(CreateGroup)
);
