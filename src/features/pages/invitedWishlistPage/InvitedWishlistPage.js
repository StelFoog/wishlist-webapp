import React from "react";
import { connect } from "react-redux";

import PageHeader from "../../components/pageHeader";
import WishlistMembers from "../../components/wishlistMembers";
import WishlistItem from "./components/wishlistItem";
import ChatWindow from "./components/chatWindow";
import MobileChatButton from "./components/mobileChatButton";
import { firebase } from "../../lib/firebase";
import db from "../../lib/wishlists/db.js";
import { actions } from "../../lib/wishlists/";

import "./invitedWishlistPage.css";

const { updateCurrentWishlist } = actions;
const { onWishlistChanged } = db;

class InvitedWishlistPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggleChatWindow = this.toggleChatWindow.bind(this);

    this.state = {
      items: [],
      name: "",
      uid: props.match.params.uid,
      showChat: false
    };
  }

  componentDidMount() {
    const { uid } = this.state;
    //this.getAllWishlistItems();
    let wishlist = this.props.wishlists.find(function(list) {
      return list.uid === uid;
    });
    this.setState({ items: wishlist.items, name: wishlist.title });

    this.unlisten = onWishlistChanged(
      wishlist.uid,
      (props => {
        return updatedWishlist => {
          props.updateCurrentWishlist(updatedWishlist);
        };
      })(this.props)
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  toggleChatWindow() {
    const { showChat } = this.state;
    this.setState({ showChat: !showChat });
  }

  render() {
    const { items, uid, name, showChat } = this.state;
    return (
      <React.Fragment>
        <PageHeader title={name} />
        <div className={`invitedPageContainer ${showChat ? "pageLeft" : ""}`}>
          {items.length > 0 && (
            <React.Fragment>
              {items.map((item, index) => (
                <WishlistItem
                  key={`${item} ${index}`}
                  index={index}
                  isOwner={false}
                  wishlistUid={uid}
                />
              ))}
            </React.Fragment>
          )}
          <MobileChatButton toggleChatWindow={this.toggleChatWindow} />
        </div>
        <ChatWindow
          wishlistUid={uid}
          showChat={showChat}
          toggleChatWindow={this.toggleChatWindow}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state => ({
    user: state.auth,
    wishlists: state.wishlist.wishlists
  });
};

const mapDispatchToProps = dispatch => ({
  updateCurrentWishlist: wishlist => dispatch(updateCurrentWishlist(wishlist))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitedWishlistPage);
