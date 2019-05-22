import React from "react";
import Button from "../../../../components/button";
import { getFilteredUsers, getClaimedByUser } from "./lib";

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

  unclaimButton() {
    return (
      <Button
        variant="text"
        label="Unclaim"
        color="var(--color-primary)"
        padding="5px"
        className="smallClaimButton"
        handleClick={this.handleUnclaim}
      />
    );
  }

  smallClaimButton() {
    return (
      <Button
        variant="text"
        label="Claim"
        color="var(--color-primary)"
        padding="5px"
        className="smallClaimButton"
        handleClick={this.handleClaim}
      />
    );
  }

  getClaimContent({ claimedByUsers, users }) {
    if (claimedByUsers === undefined || claimedByUsers.length == 0) {
      return (
        <div className="itemContent itemClaim">
          <Button
            handleClick={this.handleClaim}
            variant="text"
            label="Claim"
            color="var(--color-primary)"
          />
        </div>
      );
    } else if (claimedByUsers.includes(this.props.user.uid)) {
      return (
        <div className="itemContent itemClaim">
          <div className="claimedBy">
            <h3>Claimed by</h3>
            <div className="claimUsers">
              {getFilteredUsers(claimedByUsers, users).map(user =>
                getClaimedByUser(user)
              )}
            </div>
          </div>
          {this.unclaimButton()}
        </div>
      );
    } else {
      return (
        <div className="itemContent itemClaim">
          <div className="claimedBy">
            <h3>Claimed by</h3>
            <div className="claimUsers">
              {getFilteredUsers(claimedByUsers, users).map(user =>
                getClaimedByUser(user)
              )}
            </div>
          </div>
          {this.smallClaimButton()}
        </div>
      );
    }
  }

  handleClaim = () => {
    const { claimItem, groupID, userID, index } = this.props;
    claimItem({ groupID, userID, index });
  };

  handleUnclaim = () => {
    const { unclaimItem, groupID, userID, index } = this.props;
    unclaimItem({ groupID, userID, index });
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
              this.getClaimContent({
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
