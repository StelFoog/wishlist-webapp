import React from "react";
import PageHeader from "../../components/pageHeader";
import Button from "../../components/button";
import { push } from "connected-react-router";

import { connect } from "react-redux";

import { actions } from "../../lib/authentication/";
import "./invitedUserPage.css";

const { authenticateFacebook } = actions;

const invitedUserPage = ({ handleFacebookCLick }) => (
  <div className="invited-user-page">
    <div>
      <PageHeader title="A user has invited you to a wishlist" />
    </div>
    <div className="authButtonContainer">
      <Button
        handleClick={handleFacebookCLick}
        label="Log in with Facebook"
        variant="filled"
        color="#73359B"
      />
      <Button label="Log in with Google" variant="outlined" color="#73359B" />
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  handleFacebookCLick: () => dispatch(authenticateFacebook())
});

export default connect(
  null,
  mapDispatchToProps
)(invitedUserPage);
