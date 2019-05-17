import React from "react";
import { Tabs, Tab } from "./tabs";
import PageHeader from "../../../../components/pageHeader";
import "./allWishlistsHeader.css";



class AllWishlistsHeader extends React.Component {

  render() {
    return (
      <div className="allWishlistsHeader">

        <h1 className="headerTitle">
          Wishlists
        </h1>
        <Tabs>
          <Tab
            label="Your wishlists"
            index={0}
            handleClick={this.props.handleChange}
            className="active"
            ID="0"
          />
          <Tab
            label="Shared wishlists"
            index={1}
            handleClick={this.props.handleChange}
            ID="1"
          />
        </Tabs>
      </div>
    );
  }
}

export default AllWishlistsHeader;

