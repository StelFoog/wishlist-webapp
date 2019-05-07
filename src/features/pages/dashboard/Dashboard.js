import React from "react";
import { connect } from "react-redux";
import { actions } from "../../components/dialog";
import DashboardNav from "../../components/dashboardNav";
import "./dashboard.css";

const { openDialog } = actions;

const Dashboard = ({ children }) => (
  <div className="dashboard">
    <DashboardNav />
  </div>
);

export default connect(
  null,
  null
)(Dashboard);
