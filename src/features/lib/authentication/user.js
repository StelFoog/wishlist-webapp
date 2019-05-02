function makeUser(name, uid, wishlists, ownedWishlists, groups) {
  return {
    name: name || null,
    uid: uid,
    wishlists: wishlists || [],
    ownedWishlists: ownedWishlists || [],
    groups: groups || [],
    createdWishlists: 0
  };
}

function generateWishlistUid(user) {
  let uid;
  do {
    uid = user.uid + "-" + Math.floor(Math.random() * 0x7fffffff);
  } while (user.wishlists.includes(uid));
  return uid;
}

function giveWishlistToUserAsOwner(user, wishlist) {
  user.createdWishlists++;
  return giveUserAccessToWishlist(user, wishlist);
}

function giveUserAccessToWishlist(user, wishlist) {
  user.wishlists.push(wishlist);
  return user;
}

export { makeUser, generateWishlistUid };
