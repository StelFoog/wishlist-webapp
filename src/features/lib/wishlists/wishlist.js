
function makeWishlist(title, owner, uid, endDate, members, items) {
  return {
    title: title || "",
    owner: owner || "",
    uid: uid,
    endDate: endDate,
    members: members || [],
    items: items || []
  };
}

export { makeWishlist };
