import MemberList from "./MemberList";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { actions as dialogActions } from "../../../../components/dialog";
import {
  actions as usersActions,
  selectors as usersSelectors
} from "../../../../lib/users";
import {
  selectors,
  actions as groupItemsActions
} from "../../../../lib/groupItems";

const { fetchGroupWishlistItems } = groupItemsActions;

const mapStateToProps = () => {
  const getUsers = usersSelectors.getUsersState();
  return state => ({
    users: getUsers(state)
  });
};

const mapDispatchToProps = dispatch => ({
  navigate: path => dispatch(push(`/dashboard/${path}`)),
  getUsersWithUid: users => dispatch(usersActions.getUsersWithUid(users)),
  openForm: uid =>
    dispatch(dialogActions.openDialog("addMember", { uid: uid })),
  fetchItems: ({ groupID, userID }) =>
    dispatch(fetchGroupWishlistItems({ groupID, userID }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberList);
