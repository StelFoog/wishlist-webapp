
const defaultUser = {
  name: null,
  nameLowerCase: null,
  uid: null,
  wishlists: [],
  ownedWishlists: [],
  groups: [],
  profilePictureUrl: null
};

const generateWishlistOrGroupUid = (user) => {
  let uid;
  do {
    uid = user.uid + "-" + Math.floor(Math.random() * 0x7fffffff);
  }while(user.ownedWishlists.includes(uid) || user.groups.includes(uid));

  return uid;
}

const generateWishlistUid = generateWishlistOrGroupUid;

const getUserProfilePictureUrl = (user, height = 100) => {
  return user.profilePictureUrl + "?height=" + height;
}

export { 
  getUserProfilePictureUrl,
  defaultUser, 
  generateWishlistUid, 
  generateWishlistOrGroupUid 
};
