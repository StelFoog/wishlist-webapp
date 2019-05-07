import React from "react";
import ListWishlists from "./components/listWishlists";
import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import { Tabs, Tab } from "./components/tabs";
import PageHeader from "../../components/pageHeader";
import SharedWishlists from "./components/sharedWishlists";
import SwipeableViews from "react-swipeable-views";
import "./loggedInPage.css";

class LoggedInPage extends React.Component {
  state = {
    index: 0
  };

  handleChange = value => {
    this.setState({
      index: value
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  render() {
    const { index } = this.state;
    const { openForm } = this.props;
    return (
      <div className="logged-in-page">
        <Tabs>
          <Tab
            label="Your wishlists"
            index={0}
            handleClick={this.handleChange}
          />
          <Tab
            label="Friends and family"
            index={1}
            handleClick={this.handleChange}
          />
        </Tabs>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          style={{ flex: 1, display: "flex" }}
        >
          <div className="page-tab page-tab-1">
            <PageHeader title="Your wishlists" />
            <ListWishlists />
            <div className="createWishlistButton">
              <IconButton variant="filled" handleClick={openForm}>
                <PlusIcon size={50} />
              </IconButton>
            </div>
          </div>
          <div className="page-tab page-tab-2">
            <div className="shared-wishlists">
              <PageHeader title="Shared wishlists" />
              <SharedWishlists />
            </div>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default LoggedInPage;
