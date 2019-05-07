import React from "react";
import ListWishlists from "./components/listWishlists";
import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import Tabs from "./components/tabs";
import PageHeader from "../../components/pageHeader";
import SharedWishlists from "./components/sharedWishlists";
import "./loggedInPage.css";

const LoggedInPage = ({ openForm }) => (
  <div className="page">
    <Tabs>
      <div label="Your wishlists">
        <ListWishlists />
        <div className="createWishlistButton">
          <IconButton variant="filled">
            <PlusIcon size={50} />
          </IconButton>
        </div>
      </div>
      <div label="Friends and families wishlists">
        <div className="shared-wishlists">
          <PageHeader title="Shared wishlists" />
          <SharedWishlists />
        </div>
      </div>
    </Tabs>
  </div>
);

export default LoggedInPage;
