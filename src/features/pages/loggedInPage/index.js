import React from "react";
import LoggedInPage from "./LoggedInPage";
import { connect } from "react-redux";
import { actions } from "../../components/dialog";

const { openDialog } = actions;

const LoggedInPageContainer = props => {
  return <LoggedInPage {...props} />;
};

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(openDialog("newWishlist"))
});

export default connect(
  null,
  mapDispatchToProps
)(LoggedInPageContainer);
