import React, { Component } from "react";
import { connect } from "react-redux";
import "../";
import { selectors } from "../";
import Button from "../../button";
import { submit, reduxForm, Field } from "redux-form";
import { SEARCH_FOR_USERS_WITH_NAME } from "../../../lib/authentication/types.js";

import { CardHeader, CardContent, CardActions } from "../../card";

import renderField from "../../shareForm/ShareForm.js";

const performSubmit = console.log;

class Share extends Component {
  render() {
    return(
      <React.Fragment>
        <CardHeader>{"Share wishlist"}</CardHeader>
        <CardContent>
          <form onSubmit={this.props.handleSubmit}>
            <Field
              name="Name"
              type="text"
              handleSearch={this.props.handleSearch}
              component={renderField}
            />
          </form>
        </CardContent>
        <CardActions>
          <Button
            variant="text"
            label="Cancel"
            color="red"
            handleClick={this.props.handleClose}
          />
          <Button
            variant="filled"
            label="Done"
            handleClick={() => {
              this.props.handleSubmit()
              this.props.handleClose();
            }}
          color="#003f9f"
          />
        </CardActions>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  const getDialogValues = selectors.getDialogValuesState();
  return state => ({
    value: getDialogValues(state)
  });
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: () => console.log("submitted"),
  handleSearch: (name) => {
    let users = [];
    dispatch(SEARCH_FOR_USERS_WITH_NAME, name, users);
    console.log(users);
  }
});

const tempSubmit = (values, dispatch) => console.log(values);

export default reduxForm({
  form: "share",
  onSubmit: tempSubmit ,
  destroyOnUnmount: true
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Share));
