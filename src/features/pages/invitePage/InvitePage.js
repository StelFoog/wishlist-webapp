import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { actions } from "../../components/dialog";

class InvitePage extends React.Component {
  componentDidMount() {
    this.props.openDialog(this.props.handleClose);
  }

  render() {
    console.log("invitepage render");
    return null;
  }
}

const { openDialog } = actions;
const mapDispatchToProps = dispatch => ({
  openDialog: onClose => dispatch(openDialog("invite", { onClose })),
  handleClose: () => dispatch(push("/"))
});

export default connect(
  null,
  mapDispatchToProps
)(InvitePage);
