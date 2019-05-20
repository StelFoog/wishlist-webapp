import React from "react";
import { connect } from "react-redux";
//import { selectors as wishlistSelectors } from "../../../../lib/wishlists";
import { selectors as userSelectors, actions } from "../../lib/users";
import ProfilePicture from "../profilePicture/ProfilePicture";
import "./wishlistMembers.css";

const { getUsersWithUid } = actions;

class WishlistMembers extends React.Component {
  getFilteredUsers(filter, users) {
    let array = [];
    filter.forEach(element => {
      users[element] && array.push(users[element]);
    });
    return array;
  }

  getUserPicture(user) {
    return (
      <ProfilePicture src={user.profilePictureUrl} width={this.props.size} />
    );
  }

  render() {
    const uid = this.props.wishlist.uid;
    const wishlists = this.props.ownedWishlists.concat(this.props.wishlists);
    const wishlist = wishlists.find(element => element.uid === uid);
    return (
      <div className="wishlistMembers">
        {//Object.values(this.props.users).map(user => this.getUserPicture(user))
        this.getFilteredUsers(wishlist.members, this.props.users).map(user =>
          this.getUserPicture(user)
        )}
      </div>
    );
  }
}

const mapStateToProps = () => {
  //const getWishlists = wishlistSelectors.getWishlistsState();
  const getUsers = userSelectors.getUsersState();
  return state => ({
    //wishlists: getWishlists(state),
    users: getUsers(state),
    ownedWishlists: state.wishlist.ownedWishlists,
    wishlists: state.wishlist.wishlists
  });
};

const mapDispatchToProps = dispatch => ({
  getUsers: members => dispatch(getUsersWithUid(members))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistMembers);
