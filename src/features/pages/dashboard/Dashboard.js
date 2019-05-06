import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../components/dialog";
import DashboardNav from "../../components/dashboardNav";
import ListWishlists from "../../components/listWishlists";
//import WishlistPage from "../../components/wishlistPage";
import Button from "../../components/button";
import { history } from "../../../store";
import "./dashboard.css";

const { openDialog } = actions;

const Dashboard = ({ openForm, children }) => (
  <div className="dashboard">
    <DashboardNav />

    {/* Here we place whatever dashboard page user is on, currently listWishlists as placeholder */}
    {/*<WishlistPage /> */}
    {/*history.location.pathname === "/dashboard" && <ListWishlists />*/}
    {children}
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
