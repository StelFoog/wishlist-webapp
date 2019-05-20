import WishlistTitle from "./WishlistTitle";

import { connect } from "react-redux";
import { selectors } from "../../lib/wishlists";

const mapStateToProps = () => {
  const getEdit = selectors.getEditState();
  return state => ({
    editing: getEdit(state)
  });
};

export default connect(
  mapStateToProps,
  null
)(WishlistTitle);
