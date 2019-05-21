import React from "react";
import IconButton from "../../../../components/iconButton";
import PlusIcon from "../../../../components/svgIcon/icons/PlusIcon";
import WishlistItem from "../wishlistItem";

class GroupWishlist extends React.Component {
  componentDidMount() {
    const { fetchItems, groupID, userID } = this.props;
    fetchItems({ groupID, userID });
  }

  render() {
    const { createItem, groupID, userID, currentUser, items } = this.props;
    return (
      <div className="groupWishlists">
        {items &&
          items.map((item, index) => (
            <WishlistItem
              key={item.name + index}
              item={item}
              isOwner={currentUser === userID}
              index={index}
              groupID={groupID}
              userID={userID}
            />
          ))}
        {currentUser === userID && (
          <div className="createItemButton">
            <IconButton
              variant="filled"
              color="var(--color-primary)"
              handleClick={() => createItem({ groupID, userID })}
            >
              <PlusIcon size={50} color="white" />
            </IconButton>
          </div>
        )}
      </div>
    );
  }
}

export default GroupWishlist;
