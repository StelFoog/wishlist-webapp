import React, { Component } from "react";
import IconButton from "../../../../components/iconButton";
import ListIcon from "../../../../components/svgIcon/icons/ListIcon.js";
import GroupIcon from "../../../../components/svgIcon/icons/GroupIcon.js";
import SettingsIcon from "../../../../components/svgIcon/icons/SettingsIcon.js";
import MenuIcon from "../../../../components/svgIcon/icons/MenuIcon.js";
import ProfilePicture from "../../../../components/profilePicture";
import "./dashboardNav.css";

class DashboardNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideNav: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleSideNav = () => {
    const show = this.state.showSideNav;
    this.setState({ showSideNav: !show });
  };

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
    return (
      <React.Fragment>
        <div
          ref={this.state.showSideNav ? this.setWrapperRef : ""}
          className={[
            "dashboardNav",
            this.state.showSideNav ? "" : "hidden"
          ].join(" ")}
        >
          <div className="navProfilePicture">
            <ProfilePicture src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" />
          </div>

          <div className="navButton">
            <IconButton
              className={"navButton"}
              variant={"filled"}
              label={"L"}
              color={"var(--color-light)"}
            >
              <ListIcon size={84} />
            </IconButton>
          </div>

          <div className="navButton">
            <IconButton
              className={"navButton"}
              variant={"filled"}
              color={"var(--color-light)"}
            >
              <GroupIcon size={84} />
            </IconButton>
          </div>

          <div className="navButtonBottom">
            <IconButton
              className={"navButtonBottom"}
              variant={"clear"}
              color={"var(--color-light)"}
            >
              <SettingsIcon size={84} />
            </IconButton>
          </div>
        </div>

        <div className="mobileTopNav">
          <IconButton
            variant={"clear"}
            color={"var(--color-light)"}
            handleClick={this.toggleSideNav}
          >
            <MenuIcon size={48} />
          </IconButton>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardNav;
