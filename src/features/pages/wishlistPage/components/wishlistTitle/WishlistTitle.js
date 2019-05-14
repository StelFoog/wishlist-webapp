import React from "react";
import { EditButton, DeleteButton } from "../";

import "./wishlistTitle.css";

class WishlistTitle extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { value: props.title };
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
          <h1>{title}</h1>
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
