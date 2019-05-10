import { database } from "../firebase";
import defaultGroup from "./group.js"

const _getGroupRef(uid) => database.collection("Groups").doc("" + uid);

const createGroupWithOwner = async (user, groupName) => {
  const uid = generateWishlistOrGroupUid(user);
  
  const group = {
    ...defaultGroup,
    ...{
      title: groupName,
      uid: uid,
      owner: user.uid,
      members: [user.uid],
    }
  };
  await _getGroupRef(uid).set(group);

  return group;
}
