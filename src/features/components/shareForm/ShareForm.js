import React, { Component } from "react";
import { Field } from "redux-form";
import actions from "../../lib/authentication/actions.js";
import types from "../../lib/authentication/types.js";
import { connect } from "react-redux";
import UserCard from "./UserCard.js"

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
        component.unselected.push(user);
        component.forceUpdate();
      }}
    />
  );
}

const displayUserNotSharedWith = (component) => { 
  return user => (
    <UserCard 
      user={user} 
      buttonText="Add"
      buttonColor="#009f3f"
      onClick={() => {
        component.selected.push(user);
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
        Username: <input type="text" {...input} />
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
const deepIncludes = (seq, elem) => {
  return seq.map(JSON.stringify).includes(JSON.stringify(elem));
}

class ShareForm extends Component {
  componentWillMount() {
    this.selected = [];
    this.unselected = this.props.searchResults; 
  }

  componentWillUnmount() {
    this.selected = [];
    this.unselected = [];
  }

  render() {
    this.unselected = this.props.searchResults.filter((x) => 
      !deepIncludes(this.selected, x));

    this.props.storeSelected(this.selected);

    return(
      <div className="shareForm">
        <div>
          <Field
            name="Username"
            component={renderField}
            onChange={handleInputWith(this)}
          />
          <h3> Results </h3>
          {this.unselected.map(displayUserNotSharedWith(this))}
        </div>
        <h3> Shared with </h3>
        {this.selected.map(displayUserSharedWith(this))}
      </div>
    );
  }
}

const mapStateToProps = () => {
  return state => ({
    searchResults: state.auth.searchResults,
  });
}

const mapDispatchToProps = dispatch => ({
  search: (name) => {
    if(name.length >= 3) {
      dispatch(searchForUsersWithName(name));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareForm);
