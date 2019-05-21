import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField, { required } from "./validate";
import { actions } from "../../lib/wishlists";

const { createUserWishlist } = actions;

// Wishlist createation form component
const WishlistCreateForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <React.Fragment>
      <Field
        name="title"
        component={renderField}
        type="text"
        validate={required}
        label={"Wishlist Title"}
      />
      <Field
        name="endDate"
        label="Event date"
        component={renderField}
        type="date"
      />
      <button
        style={{ display: "none" }}
        type={"submit"}
        onClick={handleSubmit}
      />
    </React.Fragment>
  </form>
);

const submit = (values, dispatch) => dispatch(createUserWishlist());

export default reduxForm({
  form: "WishlistCreateForm",
  onSubmit: submit,
  destroyOnUnmount: false
})(WishlistCreateForm);
