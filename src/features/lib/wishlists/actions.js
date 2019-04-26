import types from "./types.js";

const { CREATE_USER_WISHLIST } = types;

const createUserWishlist = () => ({
  type: CREATE_USER_WISHLIST
});

export default {
  createUserWishlist
};
