import WishlistPage from "./WishlistPage";

import { connect } from "react-redux";
import { selectors } from "../../lib/wishlists";

import { actions as dialogActions } from "../../components/dialog";
import { actions as miscActions } from "../../lib/misc";
import { actions as wishlistActions } from "../../lib/wishlists";

const { openDialog } = dialogActions;
const { setCurrentWishlistOrGroup } = miscActions;
const { editWishlistProperties, deleteWishlist } = wishlistActions;

const mapStateToProps = () => {
  const getOwnedWishlists = selectors.getOwnedWishlistsState();

  return state => ({
    wishlists: getOwnedWishlists(state)
  });
};

const mapDispatchToProps = dispatch => ({
  createItem: wishlistUid =>
    dispatch(openDialog("createItem", { wishlistUid })),
  setCurrentPage: wishlistUid =>
    dispatch(setCurrentWishlistOrGroup(wishlistUid)),
  editProperties: (wishlistUid, field, data) =>
    dispatch(editWishlistProperties(wishlistUid, field, data)),
  deleteObject: (uid, user) => dispatch(deleteWishlist(uid, user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
