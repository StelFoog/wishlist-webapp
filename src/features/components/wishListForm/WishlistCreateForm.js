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
      {false && ( // Currently unnessicary
        <div>
          <label htmlFor="firstName">First Name</label>
          <div>
            <Field
              name="firstName"
              component={renderField}
              type="text"
              placeholder="Gifts recivers first name"
              validate={required}
            />
          </div>
          <label htmlFor="lastName">Last Name</label>
          <div>
            <Field
              name="lastName"
              component={renderField}
              type="text"
              placeholder="Gifts recivers last name"
              validate={required}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  </form>
);

const submit = (values, dispatch) => dispatch(createUserWishlist());

export default reduxForm({
  form: "WishlistCreateForm",
  onSubmit: submit,
  destroyOnUnmount: false
})(WishlistCreateForm);
