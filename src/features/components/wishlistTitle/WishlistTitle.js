import React from "react";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
import WishlistMembers from "../wishlistMembers";

import "./wishlistTitle.css";

class WishlistTitle extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: props.title,
      wishlist: props.wishlist
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { editProperties, uid } = this.props;
    const { value } = this.state;
    editProperties(uid, "title", value);
  }

  render() {
    const {
      editing,
      title,
      uid,
      deleteObject,
      user,
      type,
      isOwner,
      leave
    } = this.props;
    const { value } = this.state;
    return (
      <div className="wishlistTitle">
        <div className="wishlistTitleContainer">
          {editing ? (
            <form onSubmit={this.handleSubmit}>
              <input value={value} type="text" onChange={this.handleChange} />
              <span className="bar" />
            </form>
          ) : (
            <div className="titleNoEdit">
              <h1>{title}</h1>
              {type === "wishlist" && (
                <div className="invitedUsers">
                  <h2>Invited users: </h2>
                  <WishlistMembers wishlist={this.state.wishlist} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="editButtons">
          {editing && (
            <DeleteButton
              uid={uid}
              deleteObject={deleteObject}
              user={user}
              type={type}
              isOwner={isOwner}
              leave={leave}
            />
          )}
          <EditButton />
        </div>
      </div>
    );
  }
}

export default WishlistTitle;
