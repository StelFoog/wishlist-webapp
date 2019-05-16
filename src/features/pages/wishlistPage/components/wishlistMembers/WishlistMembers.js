import React from "react";
import { connect } from "react-redux";
//import { selectors as wishlistSelectors } from "../../../../lib/wishlists";
import { selectors as userSelectors, actions } from "../../../../lib/users";
import ProfilePicture from "../../../../components/profilePicture/ProfilePicture";
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

  componentDidMount() {
    this.props.getUsers(this.props.wishlist.members)
  }

  getUserPicture(user) {
    return (
      <ProfilePicture src={user.profilePictureUrl} width={40} />
    );
  }

  render() {
    console.log("test");
    console.log(this.props.wishlist.members);
    return (
      <div className="wishlistMembers">
        {//Object.values(this.props.users).map(user => this.getUserPicture(user))
          this.getFilteredUsers(this.props.wishlist.members, this.props.users).map(user =>
            this.getUserPicture(user))
        }
      </div>
    );
  }
}



const mapStateToProps = () => {
  //const getWishlists = wishlistSelectors.getWishlistsState();
  const getUsers = userSelectors.getUsersState();
  return state => ({
    //wishlists: getWishlists(state),
    users: getUsers(state)
  });
};

const mapDispatchToProps = dispatch => ({
  getUsers: members => dispatch(getUsersWithUid(members))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistMembers);

