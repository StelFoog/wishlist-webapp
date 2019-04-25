import React, { Component } from 'react';
import PageHeader from "../pageHeader";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card/";

import "./listWishlists.css";

class ListWishlists extends Component {

  getWishlists = () => {
    return (

      <CardContainer children={
        <div className="cardContent">
          <CardHeader children={"Wishlist"} />
          <CardContent children={
            <p>Nulla esse quis velit officia reprehenderit
              reprehenderit consequat.</p>
          } />
        </div>
      } />
    );
  }

  render() {
    return (
      <div className="listWishlists">
        <PageHeader title={"Your wishlists"} />

        {/* Fetch users wishlists from database*/}
        {this.getWishlists()}

      </div>
    );
  }
}

export default ListWishlists;
