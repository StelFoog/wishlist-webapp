import GroupWishlist from "./GroupWishlist";

import { connect } from "react-redux";

import { getUser } from "../../../../lib/authentication/selectors";
import { actions as dialogActions } from "../../../../components/dialog";
import {
  selectors,
  actions as groupItemsActions
} from "../../../../lib/groupItems";

const { openDialog } = dialogActions;
const { fetchGroupWishlistItems } = groupItemsActions;

const mapStateToProps = () => {
  const getGroupWishlistItems = selectors.getGroupWishlistItemsState();
  return state => ({
    groups: state.group.groups,
    currentUser: getUser(state).uid
  });
};

const mapDispatchToProps = dispatch => ({
  createItem: ({ groupID, userID }) =>
    dispatch(openDialog("createGroupItem", { groupID, userID })),
  fetchItems: ({ groupID, userID }) =>
    dispatch(fetchGroupWishlistItems({ groupID, userID }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupWishlist);
