import React, { Component } from 'react';
import PageHeader from "../pageHeader";
import CardContainer from "../card/CardContainer";
import CardHeader from "../card/cardHeader";
import CardContent from "../card/cardContent";

import "./listWishlists.css";

class ListWishlists extends Component {
  render() {
    return (
      <div className="listWishlists">
        <PageHeader title={"Your wishlists"} />


        <CardContainer children={
          <div className="cardContent">
            <CardHeader children={"Wishlist"} />
            <CardContent children={
              <p>Nulla esse quis velit officia reprehenderit
                reprehenderit consequat.</p>
            } />
          </div>
        } />






      </div>
    );
  }
}

export default ListWishlists;
