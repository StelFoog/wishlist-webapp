import React, { Component } from 'react';
import Button from "../button";
import ProfilePicture from "../profilePicture";
import "./dashboardNav.css";

class DashboardNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSideNav: false
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleSideNav = () => {
    const show = this.state.showSideNav;
    this.setState({ showSideNav: !show })
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
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

        <div ref={this.state.showSideNav ? this.setWrapperRef : ""} className={["dashboardNav", this.state.showSideNav ? "" : "hidden"].join(" ")}>
          <div className="navProfilePicture">
            <ProfilePicture src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" />
          </div>

          <div className="navButton">
            <Button variant={"filled"} label={"L"} color={"var(--color-light)"} />
          </div>
          <div className="navButton">
            <Button variant={"filled"} label={"G"} color={"var(--color-light)"} />
          </div>
          <div className="navButtonBottom">
            <Button variant={"filled"} label={"S"} color={"var(--color-light)"} />
          </div>

        </div>

        <div className="mobileTopNav">
          <Button variant={"filled"} label={"H"} color={"var(--color-light)"} handleClick={this.toggleSideNav} />
        </div>
      </React.Fragment>
    )
  }
}


export default DashboardNav;
