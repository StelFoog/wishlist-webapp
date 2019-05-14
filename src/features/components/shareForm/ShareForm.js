import React, { Component } from "react";
import { Field } from "redux-form";
import actions from "../../lib/authentication/actions.js";
import types from "../../lib/authentication/types.js";
import { connect } from "react-redux";

const { SEARCH_FOR_USERS_WITH_NAME } = types;
const { searchForUsersWithName } = actions;

const displayUser = (user) => { 
  return(
    /*<userCard 
      user={user} 
      onShare={() => console.log("shared")}
    />*/
    <p> {user.name} </p>
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

class ShareForm extends Component {
  componentWillMount() {
    this.results = [];
    this.selected = [];
    this.unselected = [];
  }

  render() {
    console.log("HELOJAIUJS");
    console.log(this.props.searchResults);
    return(
      <div className="shareForm">
        <div>
          <Field
            name="Username"
            component={renderField}
            onChange={handleInputWith(this)}
          />
          <h3> Results </h3>
          {this.props.searchResults.map(displayUser)}
        </div>
        <h3> Shared with </h3>
        {this.selected.map(displayUser)}
      </div>
    );
  }
}

const mapStateToProps = () => {
  return state => ({
    searchResults: state.auth.searchResults
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
