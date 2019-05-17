import React from "react";
import { connect } from "react-redux";
import { selectors } from "../";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";

import { actions } from "../../../lib/groupItems";

const { createGroupWishlistItem } = actions;

const CreateItem = ({ handleSubmit, handleClose, performSubmit }) => (
  <React.Fragment>
    <CardHeader>{"Create new wishlist item"}</CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <Field
          name="name"
          component={renderField}
          type="text"
          validate={required}
        />
        <label>Price:</label>
        <Field name="price" component={renderField} type="number" />
        <label>Description:</label>
        <Field name="description" component={renderField} type="text" />
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

const mapStateToProps = () => {
  const getDialogValues = selectors.getDialogValuesState();
  return state => ({
    values: getDialogValues(state)
  });
};

const mapDispatchToProps = dispatch => ({
  performSubmit: () => dispatch(submit("createGroupItem"))
});

export default reduxForm({
  form: "createGroupItem",
  onSubmit: (values, dispatch) => dispatch(createGroupWishlistItem()),
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateItem)
);
