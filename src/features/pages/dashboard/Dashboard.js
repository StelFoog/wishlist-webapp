import React, { Component } from "react";
import DashboardNav from "../../components/dashboardNav";
import ListWishlists from "../../components/listWishlists";
import "./dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <DashboardNav />
        <ListWishlists />
      </div>
    );
  }
}

export default Dashboard;
