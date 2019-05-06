import React from "react";
import DashboardNav from "../../components/dashboardNav";
import Button from "../../components/button";
import WishlistPage from "./WishlistPage";

const wishLIstPageContainer = ({ goToForm }) => (
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

export default wishLIstPageContainer;
