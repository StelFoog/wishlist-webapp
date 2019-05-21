import React from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";

import { CardHeader, CardContent, CardActions } from "../../card";
import { WishlistCreateForm } from "../../wishListForm";
import Button from "../../button";

const NewWishlist = ({ performSubmit, handleClose }) => (
  <React.Fragment>
    <CardHeader>{"Create new Wishlist"}</CardHeader>
    <CardContent>
      <WishlistCreateForm />
    </CardContent>
    <CardActions>
      <Button
        variant={"text"}
        label={"Cancel"}
        handleClick={handleClose}
        color={"var(--color-error)"}
      />
      <Button
        variant={"text"}
        label={"Submit"}
        handleClick={performSubmit}
        color={"var(--color-accept)"}
      />
    </CardActions>
  </React.Fragment>
);

const mapDispatchToProps = dispatch => ({
  performSubmit: () => dispatch(submit("WishlistCreateForm"))
});

export default connect(
  null,
  mapDispatchToProps
)(NewWishlist);
