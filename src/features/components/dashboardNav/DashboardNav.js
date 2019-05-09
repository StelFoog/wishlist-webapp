import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../button";
import IconButton from "../iconButton";
import ListIcon from "../svgIcon/icons/ListIcon.js";
import GroupIcon from "../svgIcon/icons/GroupIcon.js";
import SettingsIcon from "../svgIcon/icons/SettingsIcon.js";
import MenuIcon from "../svgIcon/icons/MenuIcon.js";
import ProfilePicture from "../profilePicture";
import "./dashboardNav.css";
import { getUser } from "../../lib/authentication/selectors.js";

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
            <ProfilePicture
              src={
                this.props.user
                  .profilePictureUrl /*TODO: Refactor to not define picture inline?*/
              }
            />
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

const mapStateToProps = () => {
  return state => ({
    user: getUser(state)
  });
};

export default connect(
  mapStateToProps,
  null
)(DashboardNav);
