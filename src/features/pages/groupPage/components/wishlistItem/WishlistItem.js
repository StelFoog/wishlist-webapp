import React from "react";
import Button from "../../../../components/button";
import { getClaimContent } from "./lib";

class WishlistItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClaim = this.handleClaim.bind(this);
    this.handleUnclaim = this.handleUnclaim.bind(this);
  }
  componentDidMount() {
    const { claimedBy } = this.props.item;
    this.props.getUsers(claimedBy);
  }

  handleClaim = () => {
    const { claimItem, groupID, userID, index } = this.props;
    claimItem({ groupID, userID, index });
  };

  handleUnclaim = () => {
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
    const { name, description, price, claimedBy, websitelink } = item;

    return (
      <React.Fragment>
        <div className="wishlistItem">
          <div className="wishlistItemColumn wishlistColumnTitleDesc">
            <div className="itemContent itemTitle">
              <h2>{name}</h2>
            </div>
            <div className="itemContent itemDescription">
              <p>{description}</p>
            </div>
          </div>
          <div className="wishlistItemColumn">
            <div className="itemContent">
              <div className="itemPrice">
                <h3>{price}:-</h3>
              </div>
              {websitelink && (
                <div className="itemLink">
                  <a
                    href={"//" + websitelink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Button
                      variant="text"
                      label="Link"
                      className="itemLinkButton"
                      padding="0"
                      color="var(--color-primary)"
                    />
                  </a>
                </div>
              )}
            </div>
            {isOwner ? (
              <div className="itemContent">
                <Button
                  variant={"text"}
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
        </div>
      </React.Fragment>
    );
  }
}

export default WishlistItem;
