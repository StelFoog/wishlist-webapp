import React, { Component } from "react";
import { connect } from "react-redux";
import "../";
import { selectors } from "../";
import Button from "../../button";
import { reduxForm } from "redux-form";
import { CardHeader, CardContent, CardActions } from "../../card";
import ShareForm from "../../shareForm/ShareForm.js";
import types from "../../../lib/authentication/types.js";
import actions from "../../../lib/authentication/actions.js";

const { CLEAR_SEARCH } = types;
const { clearSearch } = actions;

class ShareDialog extends Component {
  componentWillMount() {
    this.initiallySelected = this.props.value.preSelected
      ? this.props.value.preSelected.slice(0)
      : [];
    this.selected = [];
  }

  render() {
    return(
      <React.Fragment>
        <CardHeader>{this.props.value.title}</CardHeader>
        <CardContent>
          <ShareForm 
            storeSelected={(x) => (this.selected = x)}
            preSelected={this.initiallySelected}
            showIf={this.props.value.showIf}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="text"
            label="Cancel"
            color="red"
            handleClick={() => {
              this.props.clearSearch();
              this.props.handleClose();
            }}
          />
          <Button
            variant="filled"
            label="Done"
            handleClick={() => {
              const added = this.selected.filter((x) => 
                (!this.initiallySelected.includes(x)));
              const removed = this.initiallySelected.filter((x) =>
                (!this.selected.includes(x)));
              this.props.clearSearch();
              this.props.value.withAdded(added);
              this.props.value.withRemoved(removed);
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
  clearSearch: () => { dispatch(clearSearch()); }
});

export default reduxForm({
  form: "share",
  onSubmit: () => {},
  destroyOnUnmount: true
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareDialog));
