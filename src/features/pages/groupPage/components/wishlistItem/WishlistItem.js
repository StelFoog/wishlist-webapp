import React from "react";
import Button from "../../../../components/button";
import { getClaimContent } from "./lib";

class WishlistItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClaim = this.handleClaim.bind(this);
  }
  componentDidMount() {
    const { claimedBy } = this.props.item;
    this.props.getUsers(claimedBy);
  }

  handleClaim = () => {
    const { claimItem, groupID, userID, index } = this.props;
    claimItem({ groupID, userID, index });
  };

  render() {
    const {
      item,
      isOwner,
      editItem,
      groupID,
      userID,
      index,
      users,
      claimItem
    } = this.props;
    const { name, description, price, claimedBy } = item;

    return (
      <React.Fragment>
        <div className="wishlistItem">
          <div className="itemContent itemTitle">
            <h2>{name}</h2>
          </div>
          <div className="itemContent itemDescription">
            <p>{description}</p>
          </div>
          <div className="itemContent">
            <div className="itemPrice">
              <h3>{price}:-</h3>
            </div>
            <div className="itemLink">
              <Button
                variant="filled"
                label="Link"
                className="itemLinkButton"
                padding="0"
                color="var(--color-primary)"
              />
            </div>
          </div>
          {isOwner ? (
            <div className="itemContent">
              <Button
                variant={"filled"}
                label={"Edit"}
                color={"var(--color-primary"}
                handleClick={() => editItem({ item, groupID, userID, index })}
              />
            </div>
          ) : (
            getClaimContent({
              handleClaim: this.handleClaim,
              claimedByUsers: claimedBy,
              users,
              claimItem
            })
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default WishlistItem;
