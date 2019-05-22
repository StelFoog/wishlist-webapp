import React from "react";
import { connect } from "react-redux";
import { PlusIcon } from "../../../../components/svgIcon";
import Ripple from "../../../../components/ripple";
import dialogActions from "../../../../components/dialog/actions.js";
import groupActions from "../../../../lib/groups/actions.js";

const { removeUserFromGroup, addUserToGroup } = groupActions;
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

const shareGroupWithDispatch = dispatch => (
  (currentGroup, currentUserUid) => {
    dispatch(openDialog("share", {
      title: "Share group",
      withAdded: added => {
        added.forEach(user => {
          dispatch(addUserToGroup(user.uid, currentGroup.uid));
        })
      },
      withRemoved: removed => {
        removed.forEach(user => {
          dispatch(removeUserFromGroup(currentGroup.uid, user.uid));
        });
      },
      preSelectedUids: currentGroup.members,
      showIf: user => (user.uid !== currentUserUid)
    }))
  }
);

const mapDispatchToProps = dispatch => ({
  shareGroup: shareGroupWithDispatch(dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(AddUser);
