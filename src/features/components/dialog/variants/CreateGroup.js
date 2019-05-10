import React from "react";
import { connect } from "react-redux";
import { selectors } from "../";
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
          <label>Name of group:</label>
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

const mapStateToProps = () => {
  const getDialogValues = selectors.getDialogValuesState();
  return state => ({
    values: getDialogValues(state)
  });
};

const mapDispatchToProps = dispatch => ({
  performSubmit: () => dispatch(submit("createGroup"))
});

export default reduxForm({
  form: "createGroup",
  onSubmit: (values, dispatch) => dispatch(createGroup(values.name))
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateGroup)
);
