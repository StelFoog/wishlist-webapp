import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../components/dialog";
import DashboardNav from "../../components/dashboardNav";
import ListWishlists from "../../components/listWishlists";
import Button from "../../components/button";
import "./dashboard.css";

const { openDialog } = actions;

const Dashboard = ({ openForm }) => (
  <div className="dashboard">
    <DashboardNav />

    {/* Here we place whatever dashboard page user is on, currently listWishlists as placeholder */}
    <ListWishlists />
    <div className="createWishlistButton">
      <Button
        variant={"filled"}
        label={"+"}
        color={"var(--color-secondary)"}
        handleClick={openForm}
      />
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(openDialog("newWishlist"))
});

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
