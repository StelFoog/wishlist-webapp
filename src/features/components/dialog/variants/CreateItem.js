import React from "react";
import { connect } from "react-redux";
// import editWishlistItem from "../../../lib/wishlistItems/db";
import { selectors } from "../";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";
import { actions } from "../../../lib/wishlistItems";
import "../dialog.css";

const { createWishlistItem } = actions;

const CreateItem = ({ handleSubmit, handleClose, values, performSubmit }) => (
  <React.Fragment>
    <CardHeader>{"Create new wishlist item"}</CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          label={"Name"}
          component={renderField}
          type="text"
          validate={required}
        />
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

const tempSubmit = (values, dispatch) => dispatch(createWishlistItem());

const mapDispatchToProps = dispatch => ({
  performSubmit: () => dispatch(submit("createItem"))
});

export default reduxForm({
  form: "createItem",
  onSubmit: tempSubmit,
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateItem)
);
