import React from "react";
import { Field, reduxForm } from "redux-form";
import { actions } from "react-redux-form";
import { connect } from "react-redux";
import { withAuth } from "react-devise";
import renderField, { required } from "./validate";

class WishListTitle extends React.Component {
  handleSubmit(data) {
    console.log("Submission received!", data);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
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
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

WishListTitle = reduxForm({
  form: "Title&User"
})(WishListTitle);

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(withAuth(WishListTitle));
