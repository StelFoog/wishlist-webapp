import React from "react";
import { connect } from "react-redux";
import { PlusIcon } from "../../../../components/svgIcon";
import Ripple from "../../../../components/ripple";
import dialogActions from "../../../../components/dialog/actions.js";
import groupActions from "../../../../lib/groups/actions.js";

const { addUserToGroup } = groupActions;
const { openDialog } = dialogActions;

const AddUser = ({ shareGroup, currentUserUid, currentGroup}) => (
  <div
    className="addUserButtonContainer memberCard"
    onClick={() => shareGroup(currentGroup, currentUserUid)}
  >
    <Ripple />
    <PlusIcon />
    <span>Add user</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  shareGroup: (currentGroup, currentUserUid) => {
    dispatch(openDialog("share", {
      title: "Share group",
      share: (users) => {
        users.forEach((user) => {
          dispatch(addUserToGroup(user.uid, currentGroup.uid));
        })
      },
      showIf: (user) => {
        return user.uid !== currentUserUid
            && !currentGroup.members.includes(user.uid);
      }
    }))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(AddUser);
