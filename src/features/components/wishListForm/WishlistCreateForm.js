import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField, { required } from "./validate";
import { actions } from "../../lib/wishlists";

const { createUserWishlist } = actions;

// Wishlist createation form component
const WishlistCreateForm = ({ handleSubmit, performSubmit }) => (
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
        name="description"
        label={"Event description"}
        type="text"
        component={renderField}
      />
      <Field
        name="endDate"
        label="Event date"
        component={renderField}
        type="date"
      />
      <button
        type="submit"
        onClick={e => {
          performSubmit();
          e.preventDefault();
        }}
        className={"hidden-form-button"}
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
