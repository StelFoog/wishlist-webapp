import React from "react";
import { connect } from "react-redux";
import { selectors } from "../";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField from "../../wishListForm/validate";
import Button from "../../button";
import { actions } from "../../../lib/groupItems";

const { editGroupItem } = actions;

const EditGroupItem = ({ handleClose, handleSubmit, performSubmit }) => (
  <React.Fragment>
    <CardHeader>{"Edit wishlist item"}</CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <Field name="name" label={"Name"} component={renderField} type="text" />
        <Field
          name="price"
          label={"Price"}
          component={renderField}
          type="number"
        />
        <Field
          name="description"
          label={"Description"}
          component={renderField}
          type="text"
        />
        <Field
          name="websitelink"
          label={"Website link"}
          component={renderField}
          type="text"
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

const mapStateToProps = () => {
  const getDialogValues = selectors.getDialogValuesState();
  return state => ({
    values: getDialogValues(state)
  });
};

const mapDispatchToProps = dispatch => ({
  performSubmit: () => dispatch(submit("editGroupItem"))
});

export default reduxForm({
  form: "editGroupItem",
  onSubmit: (values, dispatch) => dispatch(editGroupItem()),
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditGroupItem)
);
