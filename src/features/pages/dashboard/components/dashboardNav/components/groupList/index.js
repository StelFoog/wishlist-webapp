import { connect } from "react-redux";
import {
  selectors as groupSelector,
  actions as groupActions
} from "../../../../../../lib/groups";
import GroupList from "./GroupList";

const mapStateToProps = () => {
  const getGroups = groupSelector.getGroupsState();
  return state => ({
    groups: getGroups(state)
  });
};

const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(groupActions.fetchAllUserGroups())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupList);
