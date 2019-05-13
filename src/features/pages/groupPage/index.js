import { connect } from "react-redux";
import GroupPage from "./GroupPage";
import { selectors as groupSelectors } from "../../lib/groups";

const mapStateToProps = () => {
  const getGroups = groupSelectors.getGroupsState();
  return state => ({
    groups: getGroups(state)
  });
};

export default connect(
  mapStateToProps,
  null
)(GroupPage);
