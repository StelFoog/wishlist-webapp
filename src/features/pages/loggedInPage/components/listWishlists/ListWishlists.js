import React from "react";
import CardContainer from "../../../../components/card/CardContainer";
import { CardContent, CardHeader } from "../../../../components/card";
import "./listWishlists.css";
import { connect } from "react-redux";
import { actions, selectors } from "../../../../lib/wishlists";
import { push } from "connected-react-router";
import { getWishlistAvatars } from "./lib";

const { fetchOwnedWishlists } = actions;

class ListWishlists extends React.Component {
  componentDidMount() {
    const { fetchOwnedWishlists } = this.props;
    fetchOwnedWishlists();
  }

  render() {
    const { ownedWishlists } = this.props;
    return (
      <React.Fragment>
        {ownedWishlists.map(wishlist => (
          <div onClick={() => this.props.goToWishlist(wishlist)}>
            <CardContainer
              children={
                <div className="cardContent">
                  <CardHeader children={wishlist.title} />
                  <hr />
                  <CardContent
                    children={
                      <div className="wishlistCard">
                        <p className="wishlistText">...</p>
                        <div className="wishlistAvatarList">
                          {getWishlistAvatars(wishlist)}
                        </div>
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>
        ))}
      </React.Fragment>
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
