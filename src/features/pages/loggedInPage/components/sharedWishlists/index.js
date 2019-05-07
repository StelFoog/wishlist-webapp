import SharedWishlists from "./SharedWishlists";
import { connect } from "react-redux";
import { actions, selectors } from "../../../../lib/wishlists";
import { push } from "connected-react-router";

const { fetchWishlists } = actions;

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  return state => ({
    wishlists: getWishlists(state)
  });
};

const mapDispatchToProps = dispatch => ({
  fetchWishlists: () => dispatch(fetchWishlists()),
  goToWishlist: wishlist => dispatch(push(`/dashboard/guest/${wishlist.uid}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedWishlists);
