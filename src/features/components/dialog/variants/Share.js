import React, { Component } from "react";
import { connect } from "react-redux";
import "../";
import { selectors } from "../";
import Button from "../../button";
import { reduxForm } from "redux-form";
import { CardHeader, CardContent, CardActions } from "../../card";
import ShareForm from "../../shareForm/ShareForm.js";

class ShareDialog extends Component {
  render() {
    console.log(this.props.value.share);
    return(
      <React.Fragment>
        <CardHeader>Share wishlist</CardHeader>
        <CardContent>
          <ShareForm storeSelected={(x) => (this.selected = x)} />
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
              this.props.value.share(this.selected);
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

export default reduxForm({
  form: "share",
  onSubmit: () => {},
  destroyOnUnmount: true
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareDialog));
