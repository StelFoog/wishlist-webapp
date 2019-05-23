import WishlistItem from "./WishlistItem";
import { selectors } from "../../../../lib/wishlists";
import { connect } from "react-redux";
import { actions as groupActions } from "../../../../lib/groupItems";
import { actions as dialogActions } from "../../../../components/dialog";
import {
  actions as usersActions,
  selectors as userSelectors
} from "../../../../lib/users";
import { selectors as currentUserSelectors } from "../../../../lib/authentication";

const { openDialog } = dialogActions;
const { claimGroupItem, unclaimGroupItem } = groupActions;
const { getUsersWithUid } = usersActions;

const mapStateToProps = () => {
  const getCurrentUser = currentUserSelectors.getCurrentUserState();
  const getWishlists = selectors.getWishlistsState();
  const getUsers = userSelectors.getUsersState();
  return state => ({
    wishlists: getWishlists(state),
    users: getUsers(state),
    user: getCurrentUser(state)
  });
};

const mapDispatchToProps = dispatch => ({
  claimItem: ({ groupID, index, userID }) =>
    dispatch(claimGroupItem({ groupID, index, userID })),
  unclaimItem: ({ groupID, index, userID }) =>
    dispatch(unclaimGroupItem({ groupID, index, userID })),
  editItem: dialogValues => dispatch(openDialog("editGroupItem", dialogValues)),
  getUsers: claimedBy => dispatch(getUsersWithUid(claimedBy))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistItem);
