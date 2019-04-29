import React, { Component } from "react";
import DashboardNav from "../../components/dashboardNav";
import ListWishlists from "../../components/listWishlists";
import Button from "../../components/button";
import "./dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <DashboardNav />
        <div className="dashboard">
          {/* Here we place whatever dashboard page user is on, currently listWishlists as placeholder */}
          <ListWishlists />
          <div className="createWishlistButton">
            <Button
              variant={"filled"}
              label={"+"}
              color={"var(--color-secondary)"}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
