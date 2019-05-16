import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField, { required } from "./validate";
import { actions } from "../../lib/wishlists";

const { createUserWishlist } = actions;

// Wishlist createation form component
const WishlistCreateForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <React.Fragment>
      <label htmlFor="Wish List Title">Wish List Title</label>
      <div>
        <Field
          name="title"
          component={renderField}
          type="text"
          validate={required}
        />
      </div>
      <div>
        <label htmlFor="Event date">Event date</label>
        <div>
          <Field name="EventDate" component={renderField} type="date" />
        </div>
      </div>
    </React.Fragment>
  </form>
);

const submit = (values, dispatch) => dispatch(createUserWishlist());

export default reduxForm({
  form: "WishlistCreateForm",
  onSubmit: submit,
  destroyOnUnmount: false
})(WishlistCreateForm);
