import { connect } from "react-redux";
import GroupPage from "./GroupPage";
import { selectors as groupSelectors } from "../../lib/groups";

import { actions } from "../../lib/groups/";

const { updateCurrentGroup } = actions;

const mapStateToProps = () => {
  const getGroups = groupSelectors.getGroupsState();
  return state => ({
    groups: getGroups(state),
    user: state.auth
  });
};

const mapDispatchToProps = dispatch => ({
  updateCurrentGroup: group => dispatch(updateCurrentGroup(group))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupPage);
