
const defaultUser = {
  name: null,
  uid: null,
  wishlists: [],
  ownedWishlists: [],
  groups: [],
  profilePictureUrl: null
};

function generateWishlistOrGroupUid(user) {
  let uid;
  do {
    uid = user.uid + "-" + Math.floor(Math.random() * 0x7fffffff);
  }while(user.ownedWishlists.includes(uid) || user.groups.includes(uid));

  return uid;
}

const generateWishlistUid = generateWishlistOrGroupUid;

export { defaultUser, generateWishlistUid, generateWishlistOrGroupUid };
