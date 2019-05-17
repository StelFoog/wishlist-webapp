import React, { Component } from "react";
import { Field } from "redux-form";
import actions from "../../lib/authentication/actions.js";
import types from "../../lib/authentication/types.js";
import { selectUserCache } from "../../lib/users/selectors.js";
import { connect } from "react-redux";
import UserCard from "./UserCard.js"
import Paper from "../paper";

const { searchForUsersWithName } = actions;

const displayUserSharedWith = (component) => {
  return user => (
    <UserCard
      user={user}
      buttonText="Remove"
      buttonColor="#9f003f"
      onClick={() => {
        component.selected = component.selected.filter((x) =>
            x !== user);
        component.unselected.unshift(user);
        component.forceUpdate();
      }}
    />
  );
}

const displayUserList = (users) => {
  return users; 
}

const displayUserNotSharedWith = (component) => { 
  return user => (
    <UserCard 
      user={user} 
      buttonText="Add"
      buttonColor="#009f3f"
      roundCorner={false}
      margin="0.5rem"
      onClick={() => {
        component.selected.unshift(user);
        component.unselected = component.unselected.filter((x) => 
            x !== user);
        component.forceUpdate();
      }}
    />
  );
}

const renderField = ({input}) => {
    return(
      <div>
        <input type="text" {...input} placeholder="Search username..." />
      </div>
    );
}

const handleInputWith = (component) => {
  return (changeEvent, currValue, prevValue) => {
    component.props.search(currValue);
  }
}

/* Ugly solution, but necessary to compare user objects
 */
const userIncludes = (users, user) => {
  return users.map((x) => (x.uid)).includes(user.uid);
}

const isUserUid = (x) => (typeof(x) === "string");

class ShareForm extends Component {
  componentWillMount() {
    this.selected = this.props.preSelectedByUid;
  }

  componentWillUnmount() {
    this.selected = [];
    this.unselected = [];
  }

  render() {
    this.selected = this.selected.map((x) => {
      return isUserUid(x) ? this.props.userCache[x] : x;
    });
    this.unselected = this.props.searchResults.filter((x) => {
      return !userIncludes(this.selected.filter((y) => (!isUserUid(y))), x)
          && (this.props.showIf === undefined || this.props.showIf(x));
    });

    this.props.storeSelected(this.selected);

    return(
      <div className="shareForm">
        <div>
          <Field
            component={renderField}
            onChange={handleInputWith(this)}
          />
          <Paper>
            <h4> Search results: </h4>
            <div className="userCardArea">
              {displayUserList(
                this.unselected.map(displayUserNotSharedWith(this)))}
            </div>
          </Paper>
        </div>
        <Paper>
          <h4> Shared with: </h4>
          <div className="userCardArea">
            {displayUserList(this.selected.map(displayUserSharedWith(this)))}
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return state => ({
    searchResults: state.auth.searchResults,
    userCache: selectUserCache(state)
  });
}

const mapDispatchToProps = dispatch => ({
  search: (name) => {
    if(name.length >= 3)
      dispatch(searchForUsersWithName(name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareForm);
