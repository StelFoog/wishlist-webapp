import React, { Component } from "react";
import { Form, Field } from "redux-form";
import actions from "../../lib/authentication/actions.js";
import types from "../../lib/authentication/types.js";
import { selectUserCache } from "../../lib/users/selectors.js";
import { connect } from "react-redux";
import UserCard from "./UserCard.js";
import TextInput from "../textInput";

const SEARCH_DELAY_MS = 500;

const { searchForUsersWithName } = actions;

const displayUserSharedWith = component => {
  const removeUser = user => {
    component.selected = component.selected.filter(
      selectedUser => user.uid !== selectedUser.uid
    );
    component.unselected.push(user);
  };

  return user => (
    <UserCard
      user={user}
      buttonText="Remove"
      buttonColor="#9f003f"
      onClick={() => {
        removeUser(user);
        component.forceUpdate();
      }}
    />
  );
};

const displayUserNotSharedWith = component => {
  const addUser = user => {
    component.unselected.filter(
      unselectedUser => user.uid !== unselectedUser.uid
    );
    component.selected.unshift(user);
  };

  return user => (
    <UserCard
      user={user}
      buttonText="Add"
      buttonColor="#009f3f"
      margin="0.5rem"
      onClick={() => {
        addUser(user);
        component.forceUpdate();
      }}
    />
  );
};

const renderField = ({ input }) => {
  return (
    <div>
      <TextInput {...input} placeholder="Search username..." type="text" />
    </div>
  );
};

const handleInputWith = component => {
  return (changeEvent, currValue, prevValue) => {
    if(component.searchDelay) {
      clearTimeout(component.searchDelay);
      component.searchDelay = null;
    }
    const shouldChange = currValue !== prevValue
                      && currValue.length >= 3;
    if(shouldChange)
      component.searchDelay = setTimeout(() => 
        (component.props.search(currValue)), SEARCH_DELAY_MS);
  };
};

/* Ugly solution, but necessary to compare user objects
 */
const userIncludes = (users, user) => {
  return users.map(x => x.uid).includes(user.uid);
};

const isUserUid = x => typeof x === "string";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.selected = props.preSelectedUids.slice(0);
    this.searchDelay = null;
  }

  render() {
    const showIf = this.props.showIf || (() => (true));

    this.selected = this.selected.map(selectedUser =>
      isUserUid(selectedUser)
        ? this.props.userCache[selectedUser]
        : selectedUser
    );
    this.selectedToShow = this.selected.filter(
      selectedUser => 
        (selectedUser 
     && !isUserUid(selectedUser) 
     && showIf(selectedUser))
    );

    this.unselected = this.props.searchResults.filter(
      unselectedUser =>
        !userIncludes(this.selectedToShow, unselectedUser) &&
        (showIf(unselectedUser))
    );

    this.props.storeSelected(this.selected);
    return (
      <div className="shareForm">
        <Form>
          <Field
            name="shareField"
            component={renderField}
            onChange={handleInputWith(this)}
            type="text"
            onFocus={() => (console.log("helo"))}
          />
        </Form>
        {this.unselected.length > 0 && (
          <React.Fragment>
            <h4> Search results </h4>
            <div className="userCardArea">
              {this.unselected.map(displayUserNotSharedWith(this))}
            </div>
          </React.Fragment>
        )}

        {this.selected.length > 0 && (
          <React.Fragment>
            <h4> Shared with </h4>
            <div className="userCardArea">
              {this.selectedToShow.map(displayUserSharedWith(this))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => {
  return state => ({
    searchResults: state.auth.searchResults,
    userCache: selectUserCache(state),
  });
};

const mapDispatchToProps = dispatch => ({
  search: name => {
    dispatch(searchForUsersWithName(name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareForm);
