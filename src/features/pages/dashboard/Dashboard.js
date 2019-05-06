import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import DashboardNav from "../../components/dashboardNav";
import ListWishlists from "../../components/listWishlists";
import WishlistPage from "../../components/wishlistPage";
import Button from "../../components/button";
import "./dashboard.css";

const Dashboard = ({ goToForm }) => (
  <div className="dashboard">
    <DashboardNav />

    {/* Here we place whatever dashboard page user is on, currently listWishlists as placeholder */}
    <WishlistPage />
    <div className="createWishlistButton">
      <Button
        variant={"filled"}
        label={"+"}
        color={"var(--color-secondary)"}
        handleClick={goToForm}
      />
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  goToForm: () => dispatch(push("/formtest"))
});

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
