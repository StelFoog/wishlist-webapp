import React, { Component } from 'react';
import Button from "../button";
import ProfilePicture from "../profilePicture";
import "./dashboardNav.css";

class DashboardNav extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="dashboardNav">
          <div className="navProfilePicture">
            <ProfilePicture src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" />
          </div>

          <div className="navButton">
            <Button variant={"filled"} label={"Lists"} color={"var(--color-light)"} />
          </div>
          <div className="navButton">
            <Button variant={"filled"} label={"Groups"} color={"var(--color-light)"} />
          </div>
          <div className="navButtonBottom">
            <Button variant={"filled"} label={"Settings"} color={"var(--color-light)"} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}


export default DashboardNav;
