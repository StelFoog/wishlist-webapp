import MemberList from "./MemberList";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { actions as dialogActions } from "../../../../components/dialog";
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
  navigate: path => dispatch(push(`/dashboard/${path}`)),
  getUsersWithUid: users => dispatch(usersActions.getUsersWithUid(users)),
  openForm: uid => dispatch(dialogActions.openDialog("addMember", { uid: uid }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberList);