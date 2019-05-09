import React, { Component } from "react";

import IconButton from "../../../../components/iconButton";
import ListIcon from "../../../../components/svgIcon/icons/ListIcon.js";
import GroupIcon from "../../../../components/svgIcon/icons/GroupIcon.js";
import SettingsIcon from "../../../../components/svgIcon/icons/SettingsIcon.js";
import Ripple from "../../../../components/ripple";
import MenuIcon from "../../../../components/svgIcon/icons/MenuIcon.js";
import ProfilePicture from "../../../../components/profilePicture";
import RoundKeyboardArrowDown from "../../../../components/svgIcon/icons/RoundKeyboardArrowDown";
import "./dashboardNav.css";
import { getUserProfilePictureUrl } from "../../lib/authentication/user.js";
import { getUser } from "../../lib/authentication/selectors.js";

class DashboardNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideNav: false,
      groupDropdown: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleSideNav = () => {
    const show = this.state.showSideNav;
    this.setState({ showSideNav: !show });
  };

  getActivePage() {
    const { pathname } = this.props.location;
    if (
      pathname.indexOf("wishlist") > 0 ||
      pathname === "/dashboard/" ||
      pathname === "/dashboard"
    ) {
      return 0;
    } else if (pathname.indexOf("groups") > 0) {
      return 1;
    } else return -1;
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.toggleSideNav();
    }
  }

  render() {
    const activeTab = this.getActivePage();
    const { showSideNav, groupDropdown } = this.state;
    const { navigate } = this.props;
    return (
      <React.Fragment>
        <div
          ref={this.state.showSideNav ? this.setWrapperRef : ""}
          className={`dashboardNav ${showSideNav ? "" : "hidden"}`}
        >
          <div className="navProfilePicture">
            <ProfilePicture
              src={getUserProfilePictureUrl(this.props.user, 100)}
            />
          </div>
          <hr className="navDivider" />
          <div className={`active-${activeTab}`}>
            <div className="navButton" onClick={() => navigate("")}>
              <Ripple />
              <div className="icon">
                <ListIcon size={30} color="var(--color-light)" />
              </div>
              <span>Wishlists</span>
            </div>

            <div
              className="navButton"
              onClick={() => this.setState({ groupDropdown: !groupDropdown })}
            >
              <Ripple />
              <div className="icon">
                <GroupIcon size={30} color="var(--color-light)" />
              </div>
              <span>Groups</span>
              <div
                className={`dropdownArrow ${groupDropdown ? "open" : "closed"}`}
              >
                <RoundKeyboardArrowDown size={30} color="var(--color-light)" />
              </div>
            </div>
            {groupDropdown && (
              <div className="groupDropdown">
                <div className="group">hej</div>
              </div>
            )}
          </div>
          <div
            className="navButton navButtonBottom"
            onClick={() => navigate("settings")}
          >
            <Ripple />
            <div className="icon">
              <SettingsIcon size={30} />
            </div>
            <span>Settings</span>
          </div>
        </div>

        <div className="mobileTopNav">
          <IconButton
            variant={"clear"}
            color={"transparent"}
            handleClick={this.toggleSideNav}
          >
            <MenuIcon size={48} />
          </IconButton>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return state => ({
    user: getUser(state)
  });
};

export default connect(
  mapStateToProps,
  null
)(DashboardNav);