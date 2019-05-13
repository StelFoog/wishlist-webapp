import { connect } from "react-redux";
import { actions as dialogActions } from "../../../../../../components/dialog";
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
  fetchGroups: () => dispatch(groupActions.fetchAllUserGroups()),
  openForm: () => dispatch(dialogActions.openDialog("createGroup"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupList);
