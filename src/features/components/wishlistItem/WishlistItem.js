import React from "react";
import { connect } from "react-redux";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card";
import Button from "../button";
import { actions } from "../dialog";
import { selectors } from "../../lib/wishlists";
import "./wishlistItem.css";

const { openDialog } = actions;

const wishListItem = ({ wishlists, index, editItem, wishlistUid }) => {
  const wishlist = wishlists.find(element => element.uid === wishlistUid);
  const item = wishlist.items[index];
  const { name, description, price, websitelink } = item;
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
          <div className="itemContent">
            <Button
              className="editButton"
              variant={"text"}
              label={"Edit"}
              color={"var(--color-primary"}
              handleClick={() => editItem({ item, index, wishlistUid })}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = () => {
  const getOwnedWishlists = selectors.getOwnedWishlistsState();
  return state => ({
    wishlists: getOwnedWishlists(state)
  });
};

const mapDispatchToProps = dispatch => ({
  editItem: dialogValues => dispatch(openDialog("editItem", dialogValues))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wishListItem);
