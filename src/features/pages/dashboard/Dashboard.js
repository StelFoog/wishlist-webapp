import React from "react";
import DashboardNav from "./components/dashboardNav";
import "./dashboard.css";

const Dashboard = ({ children, ...rest }) => (
  <div className="dashboard">
    <DashboardNav {...rest} />
  </div>
);

export default Dashboard;
