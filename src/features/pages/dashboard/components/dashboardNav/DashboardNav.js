import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import IconButton from "../../../../components/iconButton";
import Ripple from "../../../../components/ripple";
import { actions as dialogActions } from "../../../../components/dialog";

import {
  GroupIcon,
  MenuIcon,
  RoundKeyboardArrowDown,
  SettingsIcon,
  ListIcon,
  PlusIcon,
  LogoutIcon,
  HelpIcon
} from "../../../../components/svgIcon";
import ProfilePicture from "../../../../components/profilePicture";
import { getUserProfilePictureUrl } from "../../../../lib/authentication/user.js";
import GroupList from "./components/groupList";
import "./dashboardNav.css";

import authActions from "../../../../lib/authentication/actions.js";

const { logout } = authActions;
const { openDialog } = dialogActions;

class DashboardNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideNav: false,
      groupDropdown: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);
  }

  toggleSideNav = () => {
    const show = this.state.showSideNav;
    this.setState({ showSideNav: !show });
  };

  closeSideNav() {
    this.setState({ showSideNav: false });
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
    const { showSideNav, groupDropdown } = this.state;
    const { navigate, user, createGroup, openForm, askLogout, openHelpDialog } = this.props;
    const { pathParam1, pathParam2 } = this.props.match.params;
    return (
      <React.Fragment>
        <div
          ref={this.state.showSideNav ? this.setWrapperRef : ""}
          className={`dashboardNav ${showSideNav ? "" : "hidden"}`}
        >
          <div className="navProfilePicture">
            <ProfilePicture
              width="80px"
              src={getUserProfilePictureUrl(user, 80)}
            />
            <div className="names">
              <span>{user.name}</span>
            </div>
          </div>
          <hr className="navDivider" />
          <div className={`navButtonContainer`}>
            <div
              className={`navButton ${(!pathParam1 ||
                pathParam1 === "wishlist") &&
                "active"}`}
              onClick={() => {
                navigate("");
                this.closeSideNav();
              }}
            >
              <Ripple />
              <div className="icon">
                <ListIcon size={30} color="var(--color-light)" />
              </div>
              <span>Wishlists</span>
            </div>

            <div
              className={`navButton ${pathParam1 === "group" && "active"}`}
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
            <div className="groupDropdownContainer">
              <div
                className={`groupDropdown ${groupDropdown ? "show" : "hidden"}`}
              >
                <div className="navButton" onClick={openForm}>
                  <div className="icon">
                    <PlusIcon size={30} />
                  </div>
                  <Ripple />
                  <span>Add new group</span>
                </div>

                <GroupList
                  navigate={navigate}
                  selected={pathParam1 === "group" && pathParam2}
                  closeSideNav={this.closeSideNav}
                />
              </div>
            </div>
          </div>
          <div
            className="navButton navButtonBottom"
            onClick={openHelpDialog}
          >
            <Ripple />
            <div className="icon">
              <HelpIcon size="30" />
            </div>
            <span>Help</span>
          </div>
          <div className="navButton navButtonBottom" onClick={askLogout}>
            <Ripple />
            <div className="icon">
              <LogoutIcon size="30" />
            </div>
            <span>Log out</span>
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

const mapDispatchToProps = dispatch => ({
  askLogout: () => {
    dispatch(
      openDialog("yesNo", {
        title: "Are you sure you want to log out?",
        onYes: () => {
          dispatch(logout());
          dispatch(push("/"));
        }
      })
    );
  },
  openHelpDialog: () => {
    dispatch(openDialog("help", {}));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(DashboardNav);
