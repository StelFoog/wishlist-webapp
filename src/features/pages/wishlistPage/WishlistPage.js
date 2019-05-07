import React, { Component } from "react";
import PageHeader from "../../components/pageHeader";
import WishlistItem from "../../components/wishlistItem";

import "./wishlistPage.css";
import { firebase } from "../../lib/firebase";
import { connect } from "react-redux";
import { selectors } from "../../lib/wishlists"

import { actions as dialogActions } from "../../components/dialog";

import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";

const { openDialog } = dialogActions;

// const { fetchAllItems } = actions;

/*
class WishlistPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      items: [],
      uid: props.match.params.uid
    };
  }
  getAllWishlistItems() {
    const { uid } = this.state;
    firebase
      .firestore()
      .collection("Wishlists")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.data()) {
          this.setState({ items: doc.data().items });
        }
      });
    
  }
  
  componentDidMount() {
    this.getAllWishlistItems();
  }
  

  render() {
    console.log("y9o");
    const { items } = this.state;
    return (
      <div className="wishlistPage">
        <PageHeader title="Name of wishlist" />
        {items.length > 0 && (
          <React.Fragment>
            {items.map((item, index) => (
              <WishlistItem item={item} index={index} wishlistUid={uid} />
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}
*/

const WishlistPage = ({ wishlists, pathname, createItem }) => {
  const wishlistUid = pathname.split("wishlist/").pop();
  const wishlist = wishlists.find((element) => element.uid == wishlistUid);
  const { items } = wishlist;
  return (
    <div className="wishlistPage page">
      <PageHeader title="Name of wishlist" />
      {items.length > 0 && (
        <React.Fragment>
          {items.map((item, index) => (
            <WishlistItem index={index} wishlistUid={wishlist.uid} />
          ))}
        </React.Fragment>
      )}
      <div className="createItemButton">
        <IconButton variant="filled" handleClick={() => createItem(wishlist.uid)}>
          <PlusIcon size={50} />
        </IconButton>
      </div>

    </div>
  )
}

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  return state => ({
    wishlists: getWishlists(state),
    pathname: state.router.location.pathname
  });
};

const mapDispatchToProps = dispatch => ({
  createItem: wishlistUid => dispatch(openDialog("createItem", { wishlistUid }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
