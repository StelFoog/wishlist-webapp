import React from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";

import { CardHeader, CardContent, CardActions } from "../../card";
import { WishlistCreateForm } from "../../wishListForm";
import Button from "../../button";

const NewWishlist = ({ handleSubmit, handleClose }) => (
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
        color={"red"}
      />
      <Button
        variant={"filled"}
        label={"Submit"}
        handleClick={handleSubmit}
        color={"green"}
      />
    </CardActions>
  </React.Fragment>
);

const mapDispatchToProps = dispatch => ({
  handleSubmit: () => dispatch(submit("WishlistCreateForm"))
});

export default connect(
  null,
  mapDispatchToProps
)(NewWishlist);
