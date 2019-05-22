import { connect } from "react-redux";
import GroupPage from "./GroupPage";
import {
  selectors as groupSelectors,
  actions as groupActions
} from "../../lib/groups";

const {
  leaveGroup,
  editGroupProperties,
  deleteGroup,
  updateCurrentGroup
} = groupActions;

const mapStateToProps = () => {
  const getGroups = groupSelectors.getGroupsState();
  return state => ({
    groups: getGroups(state),
    user: state.auth.user
  });
};

const mapDispatchToProps = dispatch => ({
  updateCurrentGroup: group => dispatch(updateCurrentGroup(group)),
  editProperties: (wishlistUid, field, data) =>
    dispatch(editGroupProperties(wishlistUid, field, data)),
  leave: (groupID, userID) => dispatch(leaveGroup(groupID, userID)),
  deleteGroup: (groupID, userID) => dispatch(deleteGroup(groupID, userID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupPage);
