import React from "react";
import DashboardNav from "../../components/dashboardNav";
import Button from "../../components/button";
import WishlistPage from "./WishlistPage";

const wishLIstPageContainer = ({ goToForm, ...rest }) => (
  <div className="page">
    {/* Here we place whatever dashboard page user is on, currently listWishlists as placeholder */}
    <WishlistPage {...rest} />
  </div>
);

export default wishLIstPageContainer;
