import React from "react";
import { connect } from "react-redux";
import Button from "../../../../components/button";
import { selectors } from "../../../../lib/wishlists";
import { actions as wishlistActions } from "../../../../lib/wishlistItems";
import {
  actions as userActions,
  selectors as userSelectors
} from "../../../../lib/users";
import "./wishlistItem.css";
import ProfilePicture from "../../../../components/profilePicture/ProfilePicture";
import usersReducer from "../../../../lib/users/reducers";

const { claimWishlistItem } = wishlistActions;
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

  getClaimContent(wishlistUid, index, claimedBy) {
    if (claimedBy === undefined || claimedBy.length == 0) {
      return (
        <div className="itemContent itemClaim">
          <Button
            handleClick={() => this.props.claimItem(wishlistUid, index)}
            variant="filled"
            label="Claim item"
            color="var(--color-primary)"
          />
        </div>
      );
    } else {
      return (
        <div className="itemContent itemClaim">
          <h3>Claimed by:</h3>
          <div className="claimUsers">
            {this.getFilteredUsers(claimedBy, this.props.users).map(user =>
              this.getClaimedByUser(user)
            )}
          </div>
        </div>
      );
    }
  }

  //Load all the users who have claimed the item into the state
  componentDidMount() {
    console.log("component did mount");
    const { claimedBy } = this.state.item;
    console.log(claimedBy);
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
          <div className="itemContent itemTitle">
            <h2>{name}</h2>
          </div>
          <div className="itemContent itemDescription">
            <p>{description}</p>
          </div>
          <div className="itemContent">
            <div className="itemPrice">
              <h3>{price}:-</h3>
            </div>
            <div className="itemLink">
              <Button
                variant="filled"
                label="Link"
                className="itemLinkButton"
                padding="0"
                color="var(--color-primary)"
              />
            </div>
          </div>
          {this.getClaimContent(wishlistUid, index, claimedBy)}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  const getUsers = userSelectors.getUsersState();
  return state => ({
    wishlists: getWishlists(state),
    users: getUsers(state)
  });
};

const mapDispatchToProps = dispatch => ({
  claimItem: (wishlistUid, index) =>
    dispatch(claimWishlistItem(wishlistUid, index)),
  getUsers: claimedBy => dispatch(getUsersWithUid(claimedBy))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistItem);
