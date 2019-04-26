const user = (name, uid, wishlists, groups) => ({
  name: name || null,
  uid: uid,
  wishlists: wishlists || [],
  groups: groups || [],
  createdWishlists: 0
});

const generateWishlistUid = user => {
  const uid = user.uid + "-" + user.createdWishlists;
  const nextUser = Object.assign(user);
  ++nextUser.createdWishlists;
  return { uid, nextUser };
};

export { user, generateWishlistUid };
