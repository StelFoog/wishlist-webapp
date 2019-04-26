
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

export {
  makeUser,
  generateWishlistUid
};
