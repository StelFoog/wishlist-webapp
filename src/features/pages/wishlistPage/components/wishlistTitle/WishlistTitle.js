import React from "react";
import { EditButton, DeleteButton, WishlistMembers } from "../";

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
    const { editWishlistProperties, uid } = this.props;
    const { value } = this.state;
    editWishlistProperties(uid, "title", value);
  }

  render() {
    const { editing, title, uid } = this.props;
    const { value } = this.state;
    return (
      <div className="wishlistTitle">
        {editing ? (
          <form onSubmit={this.handleSubmit}>
            <input value={value} type="text" onChange={this.handleChange} />
            <span className="bar" />
          </form>
        ) : (
            <div className="titleNoEdit">
              <h1>{title}</h1>
              <div className="invitedUsers">
                <h2>Invited users: </h2>
                <WishlistMembers wishlist={this.state.wishlist} />
              </div>
            </div>
          )}
        <div className="editButtons">
          {editing && <DeleteButton uid={uid} />}
          <EditButton />
        </div>
      </div>
    );
  }
}

export default WishlistTitle;
