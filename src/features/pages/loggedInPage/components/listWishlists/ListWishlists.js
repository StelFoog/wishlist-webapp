import React from "react";
import CardContainer from "../../../../components/card/CardContainer";
import { CardContent, CardHeader } from "../../../../components/card";
import "./listWishlists.css";
import { connect } from "react-redux";
import { actions, selectors } from "../../../../lib/wishlists";
import { push } from "connected-react-router";
import { getWishlistAvatars } from "./lib";
import WishlistMembers from "../../../../components/wishlistMembers";

const { fetchOwnedWishlists } = actions;

class ListWishlists extends React.Component {
  componentDidMount() {
    const { fetchOwnedWishlists } = this.props;
    fetchOwnedWishlists();
  }

  render() {
    const { ownedWishlists } = this.props;
    return (
      <div className="listWishlists">
        {ownedWishlists.map(wishlist => (
          <div onClick={() => this.props.goToWishlist(wishlist)}>
            <CardContainer
              children={
                <div className="wishlistCard">
                  <h1 className="wishlistCardTitle">{wishlist.title}</h1>
                  <p className="wishlistDescription">
                    {wishlist.description || "No description provided"}
                  </p>
                  <div className="wishlistMembersDue">
                    <WishlistMembers wishlist={wishlist} size={60} />
                    {wishlist.endDate && <h3>Date: {wishlist.endDate}</h3>}
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = () => {
  const getOwnedWishlists = selectors.getOwnedWishlistsState();
  return state => ({
    ownedWishlists: getOwnedWishlists(state)
  });
};

const mapDispatchToProps = dispatch => ({
  fetchOwnedWishlists: () => dispatch(fetchOwnedWishlists()),
  goToWishlist: wishlist =>
    dispatch(push(`/dashboard/wishlist/${wishlist.uid}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWishlists);
