import React from "react";
import { connect } from "react-redux";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";
import { actions as groupActions } from "../../../lib/groups";
const { addUserToGroup } = groupActions;

const AddMember = ({ handleClose, performSubmit, values, ...rest }) => {
  return (
    <React.Fragment>
      <CardHeader>{"Add new member"}</CardHeader>
      <CardContent>
        <form onSubmit={performSubmit}>
          <Field
            name="name"
            label="Users uid"
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
  performSubmit: () => dispatch(submit("addMember"))
});

export default reduxForm({
  form: "addMember",
  onSubmit: (values, dispatch) => dispatch(addUserToGroup(values.name)),
  destroyOnUnmount: false
})(
  connect(
    null,
    mapDispatchToProps
  )(AddMember)
);
