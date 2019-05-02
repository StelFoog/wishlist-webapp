import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
//import { withAuth } from "react-devise";
import renderField, { required } from "./validate";
import { actions } from "../../lib/wishlists";

const { createUserWishlist } = actions;

// Wishlist createation form component
const WishlistCreateForm = ({ handleSubmit, handleCreateWishlist }) => (
  <form onSubmit={handleSubmit(handleCreateWishlist)}>
    <div>
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
      <button>Submit</button>
    </div>
  </form>
);

const mapDispatchToProps = dispatch => ({
  handleCreateWishlist: () => dispatch(createUserWishlist())
});

export default reduxForm({
  form: "WishlistCreateForm"
})(
  connect(
    null,
    mapDispatchToProps
  )(WishlistCreateForm)
);
