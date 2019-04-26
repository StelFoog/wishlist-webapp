
function makeUser(name, uid, wishlists, groups) {
  return {
    name: name || null, 
    uid :  uid, 
    wishlists: wishlists || [],
    groups   : groups    || [],
    createdWishlists: 0
  };
}

function generateWishlistUid(user) {
  return user.uid + '-' + user.createdWishlists;
}

function giveWishlistToUserAsOwner(user, wishlist) {
  user.createdWishlists++;
  return giveUserAccessToWishlist(user, wishlist);
}

function giveUserAccessToWishlist(user, wishlist) {
  user.wishlists.push(wishlist);
  return user;
}

export {
  makeUser,
  giveWishlistToUserAsOwner,
  giveUserAccessToWishlist,
  generateWishlistUid
};
