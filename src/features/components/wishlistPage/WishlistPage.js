import React, { Component } from 'react';
import PageHeader from "../pageHeader";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card/";
import "./wishlistPage.css";

import { connect } from "react-redux";
import { actions, selectors } from "../../lib/wishlistItems";

const { fetchAllItems } = actions;

class WishlistPage extends Component {

  displayWishlistItem(Item) {
    return (
      <CardContainer>
        <div className="itemContent">
          <div class="itemText">
            <CardHeader children={"Stekpanna"} />
            <CardContent>
              <p>Fin stekpanna</p>
            </CardContent>
          </div>

          <div className="itemPrice">
            <h3>1000kr</h3>
          </div>
        </div>
      </CardContainer>
    );
  }

  getAllWishlistItems() {

  }

  componentDidMount() {
    this.props.fetchWishlistItems();
  }

  render() {
    return (
      <div className="wishlistPage">
        <PageHeader title="Name of wishlist" />
        {this.displayWishlistItem("hello")}

      </div>
    );
  }
}

const mapStateToProps = () => {
  const getWishlistItems = selectors.getItemsState();
  return state => ({
    items: getWishlistItems(state)
  });
}

const mapDispatchToProps = {

}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
