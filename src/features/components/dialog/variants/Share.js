import React, { Component } from "react";
import { connect } from "react-redux";
import "../";
import { selectors } from "../";
import Button from "../../button";
import { submit, reduxForm, Field } from "redux-form";
import types from "../../../lib/authentication/types.js";
import { CardHeader, CardContent, CardActions } from "../../card";
import renderField from "../../shareForm/ShareForm.js";
import actions from "../../../lib/authentication/actions.js";

const { searchForUsersWithName } = actions;

const { SEARCH_FOR_USERS_WITH_NAME } = types;

const performSubmit = console.log;

class Share extends Component {
  componentDidMount() {

  }

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
          <p> Before </p>
          {
            __searchedUsers == [] || __searchedUsers === undefined
          ? <p> None to show </p>
          : __searchedUsers.map((user) => 
            <p> {user.name} </p>)
          }
          <p> After </p>
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

var __searchedUsers = [];

const mapDispatchToProps = dispatch => ({
  handleSubmit: () => console.log("submitted"),
  handleSearch: (name) => {
    __searchedUsers = [];
    dispatch(searchForUsersWithName(name, __searchedUsers));
    console.log("RESULTS OF SEARCH:");
    console.log(__searchedUsers);
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
