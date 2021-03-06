import React from "react";
import ListWishlists from "./components/listWishlists";
import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import AllWishlistsHeader from "./components/allWishlistsHeader";
import SharedWishlists from "./components/sharedWishlists";
import SwipeableViews from "react-swipeable-views";
import ShareForm from "../../components/shareForm/ShareForm";
import { Tabs, Tab } from "./components/allWishlistsHeader/tabs";
import "./loggedInPage.css";

class LoggedInPage extends React.Component {
  state = {
    index: 0
  };

  handleChange = value => {
    // Check that we arent clicking on the active tab, if not, change active tab
    if (this.state.index !== value) {
      if (this.state.index === 0) {
        document.getElementById("0").classList.remove("active-tab");
        document.getElementById("1").classList.add("active-tab");
      } else {
        document.getElementById("0").classList.add("active-tab");
        document.getElementById("1").classList.remove("active-tab");
      }
    }

    this.setState({
      index: value
    });

    // Scroll to the top when user changes tabs
    window.scrollTo(0, 0);
  };

  render() {
    const { index } = this.state;
    const { openForm } = this.props;
    return (
      <div className="logged-in-page">
        <AllWishlistsHeader handleChange={this.handleChange} index={index} />
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChange}
          style={{ flex: 1, display: "flex" }}
        >
          <div className="page-tab page-tab-1">
            {/*<PageHeader title="Your wishlists" />*/}
            <ListWishlists />
          </div>
          <div className="page-tab page-tab-2">
            <div className="shared-wishlists">
              {/*<PageHeader title="Shared wishlists" />*/}
              <SharedWishlists />
            </div>
          </div>
        </SwipeableViews>
        <div
          className={`createWishlistButton ${index === 0 ? "shown" : "hidden"}`}
        >
          <IconButton
            variant="filled"
            handleClick={openForm}
            color="var(--color-primary)"
          >
            <PlusIcon size={50} color="white" />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default LoggedInPage;
