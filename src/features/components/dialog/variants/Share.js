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
import userActions from "../../../lib/users/actions.js";

const { getUsersWithUids } = userActions;

const { CLEAR_SEARCH } = types;
const { clearSearch } = actions;

class ShareDialog extends Component {
  constructor(props) {
    super(props);
    props.getUsersWithUids(props.value.preSelectedUids);
    this.initiallySelectedUids = props.value.preSelectedUids;
    this.selected = [];
  }

  render() {
    return(
      <React.Fragment>
        <CardHeader>{this.props.value.title}</CardHeader>
        <CardContent>
          <ShareForm 
            storeSelected={(x) => (this.selected = x)}
            preSelectedUids={this.initiallySelectedUids}
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
              const lookupUser = (uid) => {
                return this.props.userCache[uid];
              }
              
              console.log("MESSAGE:");
              console.log(this.selected);
              const added = this.selected.filter(selectedUser => 
                (!this.initiallySelectedUids.includes(selectedUser.uid)));
              console.log(added);
              const removed = this.initiallySelectedUids
                .filter(initiallySelectedUid => 
                  (!this.selected
                    .map(selectedUser => (selectedUser.uid))
                    .includes(initiallySelectedUid)));
              console.log(removed);

              this.props.clearSearch();
              this.props.value.withAdded(added);
              this.props.value.withRemoved(removed.map(lookupUser));
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
    value: getDialogValues(state),
    userCache: state.users.users
  });
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: () => 0,
  clearSearch: () => (dispatch(clearSearch())),
  getUsersWithUids: uids => (dispatch(getUsersWithUids(uids)))
});

export default reduxForm({
  form: "share",
  onSubmit: () => {},
  destroyOnUnmount: true
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareDialog));
