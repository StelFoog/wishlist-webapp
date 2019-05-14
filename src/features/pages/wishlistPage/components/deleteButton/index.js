import DeleteButton from "./DeleteButton";
import { connect } from "react-redux";
import { actions } from "../../../../lib/wishlists";
import { getUser } from "../../../../lib/authentication/selectors";

const { deleteWishlist } = actions;

const mapStateToProps = () => state => ({
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
  deleteWishlist: (uid, user) => dispatch(deleteWishlist(uid, user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteButton);
