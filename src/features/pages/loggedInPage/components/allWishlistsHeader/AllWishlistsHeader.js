import React from "react";
import { Tabs, Tab } from "./tabs";
import PageHeader from "../../../../components/pageHeader";
import "./allWishlistsHeader.css";

class AllWishlistsHeader extends React.Component {
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = { width: 0, left: 0 };
  }

  updateDimensions() {
    let activeTab = document.getElementsByClassName("active-tab")[0];
    let width;
    let left;
    if (activeTab) {
      width = activeTab.clientWidth;
      left = activeTab.getBoundingClientRect().left;
      if (window.innerWidth > 600) {
        left -= 170;
      }
      this.setState({ left: left, width: width, activeTab: activeTab });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.index !== this.props.index) {
      this.updateDimensions();
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="allWishlistsHeader">
        <h1 className="headerTitle wishlistPageTitle">Wishlists</h1>
        <Tabs>
          <Tab
            active={this.props.index}
            label="Your wishlists"
            index={0}
            handleClick={this.props.handleChange}
            className="active-tab"
            ID="0"
          />
          <Tab
            active={this.props.index}
            label="Shared wishlists"
            index={1}
            handleClick={this.props.handleChange}
            ID="1"
          />
        </Tabs>
        <div
          className="tab-bar"
          style={{
            width: `${this.state.width}px`,
            left: `${this.state.left}px`
          }}
          index={this.props.index}
        />
      </div>
    );
  }
}

export default AllWishlistsHeader;
