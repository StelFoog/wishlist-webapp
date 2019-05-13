import MemberList from "./MemberList";
import { connect } from "react-redux";
import {
  actions as usersActions,
  selectors as usersSelectors
} from "../../../../lib/users";

const mapStateToProps = () => {
  const getUsers = usersSelectors.getUsersState();
  return state => ({
    users: getUsers(state)
  });
};
const mapDispatchToProps = dispatch => ({
  getUsersWithUid: users => dispatch(usersActions.getUsersWithUid(users))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberList);
