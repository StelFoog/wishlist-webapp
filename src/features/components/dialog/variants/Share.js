import React, { Component } from "react";
import { connect } from "react-redux";
import "../";
import { selectors } from "../";
import Button from "../../button";
import { submit, reduxForm, Field } from "redux-form";
import { CardHeader, CardContent, CardActions } from "../../card";
import ShareForm, { renderField } from "../../shareForm/ShareForm.js";

class ShareDialog extends Component {
  render() {
    return(
      <React.Fragment>
        <CardHeader>Share wishlist</CardHeader>
        <CardContent>
          <ShareForm callback={this.props.callback} />
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
  handleSubmit: () => console.log("handleSubmit()"),
});

const tempSubmit = (values, dispatch) => {
  console.log("tempSubmit()");
  console.log(values);
}

export default reduxForm({
  form: "share",
  onSubmit: tempSubmit ,
  destroyOnUnmount: true
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareDialog));
