import React from "react";
import { connect } from "react-redux";
import { selectors } from "../";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";
import { actions as groupActions } from "../../../lib/groups";

const { addUserToGroup } = groupActions;

const AddMember = ({ performSubmit, values, ...rest }) => {
  return (
    <React.Fragment>
      <CardHeader>{"Add new member"}</CardHeader>
      <CardContent>
        <form onSubmit={performSubmit}>
          <label>Users uid:</label>
          <Field
            name="name"
            component={renderField}
            type="text"
            validate={required}
          />
        </form>
      </CardContent>
      <CardActions>
        <Button
          label="SUBMIT"
          color="green"
          variant="filled"
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
  onSubmit: (values, dispatch) => dispatch(addUserToGroup(values.name))
})(
  connect(
    null,
    mapDispatchToProps
  )(AddMember)
);
