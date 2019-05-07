import React from "react";
import { connect } from "react-redux";
import ListWishlists from "./components/listWishlists";
import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import Tabs from "./components/tabs";
import PageHeader from "../../components/pageHeader";
import SharedWishlists from "./components/sharedWishlists";
import "./loggedInPage.css";
import { actions } from "../../components/dialog";

const { openDialog } = actions;

const LoggedInPage = ({ openForm }) => (
  <div className="page">
    <Tabs>
      <div label="Your wishlists">
        <ListWishlists />
        <div className="createWishlistButton">
          <IconButton variant="filled" handleClick={openForm}>
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

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(openDialog("newWishlist"))
});

export default connect()(LoggedInPage);
