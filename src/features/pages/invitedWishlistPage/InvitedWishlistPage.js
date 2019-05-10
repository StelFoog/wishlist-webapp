import React from "react";

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

  getAllWishlistItems() {
    const { uid } = this.state;
    firebase
      .firestore()
      .collection("Wishlists")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.data()) {
          this.setState({ items: doc.data().items, name: doc.data().title });
        }
      });
  }

  componentDidMount() {
    this.getAllWishlistItems();
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

export default InvitedWishlistPage;
