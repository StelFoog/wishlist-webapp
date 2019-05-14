import React, { Component } from "react";
import { Field } from "redux-form";
import actions from "../../lib/authentication/actions.js";
import types from "../../lib/authentication/types.js";
import { connect } from "react-redux";

const { SEARCH_FOR_USERS_WITH_NAME } = types;
const { searchForUsersWithName } = actions;

const displayUser = (user) => { return <p> user.name </p>; }

const renderField = ({input}) => {
    return(
      <div>
        Username: <input type="text" {...input} />
      </div>
    );
}

const handleInputWith = (component) => {
  return (changeEvent, currValue, prevValue) => {
    component.results = component.props.search(currValue);
    component.forceUpdate();
  }
}

class ShareForm extends Component {
  componentWillMount() {
    this.results = [];
    this.selected = [];
    this.unselected = [];
  }

  render() {
    return(
      <div className="shareForm">
        <Field
          name="Username"
          component={renderField}
          onChange={handleInputWith(this)}
        />
        <h3> Results </h3>
        {this.results.map(displayUser)}
        <h3> Share with </h3>
        {this.unselected.map(displayUser)}
        <h3> Shared with </h3>
        {this.selected.map(displayUser)}
      </div>
    );
  }

  componentDidMount() {
    console.log("Helo i am mount");
  }
}

const mapDispatchToProps = dispatch => ({
  search: (name) => {
    let results = [];
    if(name.length >= 3)
      dispatch(searchForUsersWithName(name, results));
    console.log("Search results for " + name + ":");
    console.log(results);
    return results;
  }
});

export default connect(
  null,
  mapDispatchToProps
)(ShareForm);
