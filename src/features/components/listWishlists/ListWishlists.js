import React, { Component } from 'react';
import PageHeader from "../pageHeader";
import CardContainer from "../card/CardContainer";


import "./listWishlists.css";

class ListWishlists extends Component {
  render() {
    return (
      <div className="listWishlists">
        <PageHeader title={"Your wishlists"} />
        <CardContainer children={
          <h3>Wishlist 1</h3>
        } />
        <CardContainer children={
          <h3>Wishlist 2</h3>
        } />
        <CardContainer children={
          <h3>Wishlist 3</h3>
        } />
        <CardContainer children={
          <h3>Wishlist 4</h3>
        } />


      </div>
    )
  }
}

export default ListWishlists;
