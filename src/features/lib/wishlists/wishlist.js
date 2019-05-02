const makeWishlist = (title, owner, uid, endDate, members, items) => ({
  title: title || "",
  owner: owner || "",
  uid: uid,
  endDate: endDate || 0,
  members: members || [],
  items: items || []
});

export { makeWishlist };
