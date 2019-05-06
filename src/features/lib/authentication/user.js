function makeUser(name, uid, wishlists, groups) {
  return {
    name: name || null,
    uid: uid,
    wishlists: wishlists || [],
    groups: groups || [],
    createdWishlists: 0
  };
}

function generateWishlistUid(user) {
  let uid;
  do {
<<<<<<< HEAD
    uid = user.uid + "-" + Math.floor(Math.random() * 0x7fffffff);
  } while (user.wishlists.includes(uid));

=======
    uid = user.uid + '-' + Math.floor(Math.random() * 0x7fffffff);
  }while(user.wishlists.includes(uid));
>>>>>>> eb0e4c27cdd7d6224324a684602f9038955cf1b7
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

export {
  makeUser,
  giveWishlistToUserAsOwner,
  giveUserAccessToWishlist,
  generateWishlistUid
};
