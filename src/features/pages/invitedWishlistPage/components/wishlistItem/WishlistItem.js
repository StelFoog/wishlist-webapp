import React from "react";
import { connect } from "react-redux";
import Button from "../../../../components/button";
import { selectors } from "../../../../lib/wishlists";
import { actions as wishlistActions } from "../../../../lib/wishlistItems";
import {
  actions as userActions,
  selectors as userSelectors
} from "../../../../lib/users";
import { selectors as currentUserSelectors } from "../../../../lib/authentication";

import ProfilePicture from "../../../../components/profilePicture/ProfilePicture";
import usersReducer from "../../../../lib/users/reducers";

const { claimWishlistItem, unclaimWishlistItem } = wishlistActions;
const { getUsersWithUid } = userActions;

class WishlistItem extends React.Component {
  constructor(props) {
    super(props);

    const { wishlists, index, wishlistUid } = this.props;
    const wishlist = wishlists.find(element => element.uid == wishlistUid);

    const item = wishlist.items[index];

    this.state = {
      item,
      wishlist
    };
  }

  getClaimedByUser(user) {
    const { name, profilePictureUrl } = user;

    return (
      <div>
        <div className="userWhoClaimed">
          <ProfilePicture src={profilePictureUrl} width={40} />
          <div className="userWhoClaimedName">
            <p>{name}</p>
          </div>
        </div>
      </div>
    );
  }

  getFilteredUsers(filter, users) {
    let array = [];
    filter.forEach(element => {
      users[element] && array.push(users[element]);
    });
    return array;
  }

  unclaimButton(wishlistUid, index) {
    return (
      <Button
        variant="text"
        label="Unclaim"
        color="var(--color-primary)"
        padding="5px"
        className="smallClaimButton"
        handleClick={() => this.props.unclaimItem(wishlistUid, index)}
      />
    );
  }

  smallClaimButton(wishlistUid, index) {
    return (
      <Button
        variant="text"
        label="Claim"
        color="var(--color-primary)"
        padding="5px"
        className="smallClaimButton"
        handleClick={() => this.props.claimItem(wishlistUid, index)}
      />
    );
  }

  getClaimContent(wishlistUid, index, claimedBy) {
    if (claimedBy === undefined || claimedBy.length == 0) {
      return (
        <div className="itemContent itemClaim">
          <Button
            handleClick={() => this.props.claimItem(wishlistUid, index)}
            variant="text"
            label="Claim"
            color="var(--color-primary)"
          />
        </div>
      );
    } else if (claimedBy.includes(this.props.currentUser.uid)) {
      return (
        <div className="itemContent itemClaim">
          <div className="claimedBy">
            <h3>Claimed by</h3>
            <div className="claimUsers">
              {this.getFilteredUsers(claimedBy, this.props.users).map(user =>
                this.getClaimedByUser(user)
              )}
            </div>
          </div>
          {this.unclaimButton(wishlistUid, index)}
        </div>
      );
    } else {
      return (
        <div className="itemContent itemClaim">
          <div className="claimedBy">
            <h3>Claimed by</h3>
            <div className="claimUsers">
              {this.getFilteredUsers(claimedBy, this.props.users).map(user =>
                this.getClaimedByUser(user)
              )}
            </div>
          </div>
          {this.smallClaimButton(wishlistUid, index)}
        </div>
      );
    }
  }

  //Load all the users who have claimed the item into the state
  componentDidMount() {
    const { claimedBy } = this.state.item;
    this.props.getUsers(claimedBy);
  }

  render() {
    const { wishlists, index, wishlistUid } = this.props;
    const wishlist = wishlists.find(element => element.uid == wishlistUid);
    const item = wishlist.items[index];
    const { name, description, price, claimedBy, link } = item;

    return (
      <React.Fragment>
        <div className="wishlistItem">
          <div className="wishlistItemColumn wishlistColumnTitleDesc">
            <div className="itemContent itemTitle">
              <h2>{name}</h2>
            </div>
            <div className="itemContent itemDescription">
              <p>{description}</p>
            </div>
          </div>
          <div className="wishlistItemColumn">
            <div className="itemContent itemPriceLink">
              <div className="itemPrice">
                <h3>{price}:-</h3>
              </div>
              <div className="itemLink">
                <Button
                  variant="text"
                  label="Link"
                  className="itemLinkButton"
                  padding="5px"
                  color="var(--color-primary)"
                />
              </div>
            </div>
            {this.getClaimContent(wishlistUid, index, claimedBy)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  const getUsers = userSelectors.getUsersState();
  const getCurrentUser = currentUserSelectors.getCurrentUserState();
  return state => ({
    wishlists: getWishlists(state),
    users: getUsers(state),
    currentUser: getCurrentUser(state)
  });
};

const mapDispatchToProps = dispatch => ({
  claimItem: (wishlistUid, index) =>
    dispatch(claimWishlistItem(wishlistUid, index)),
  unclaimItem: (wishlistUid, index) =>
    dispatch(unclaimWishlistItem(wishlistUid, index)),
  getUsers: claimedBy => dispatch(getUsersWithUid(claimedBy))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistItem);
