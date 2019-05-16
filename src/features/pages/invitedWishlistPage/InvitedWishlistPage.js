import React from "react";
import { connect } from "react-redux";

import PageHeader from "../../components/pageHeader";
import WishlistItem from "./components/wishlistItem";
import ChatWindow from "./components/chatWindow";
import MobileChatButton from "./components/mobileChatButton";
import { firebase } from "../../lib/firebase";

import "./invitedWishlistPage.css";

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
  }

  toggleChatWindow() {
    const { showChat } = this.state;
    this.setState({ showChat: !showChat });
  }

  render() {
    const { items, uid, name, showChat } = this.state;
    return (
      <React.Fragment>
        <div className={`invitedPageContainer ${showChat ? "pageLeft" : ""}`}>
          <PageHeader title={name} />
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

export default connect(
  mapStateToProps,
  null
)(InvitedWishlistPage);
