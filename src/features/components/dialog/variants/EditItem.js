import React from "react";
import { connect } from "react-redux";
// import editWishlistItem from "../../../lib/wishlistItems/db";
import { selectors } from "../";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField, { required } from "../../wishListForm/validate";
import Button from "../../button";
import { actions } from "../../../lib/wishlistItems";

const { editWishlistItem } = actions;

const EditItem = ({ handleSubmit, handleClose, values, performSubmit }) => {
  const { item } = values;
  console.log(item);
  return (
    <React.Fragment>
      <CardHeader>{"Edit wishlist item"}</CardHeader>
      <CardContent>

        <form onSubmit={handleSubmit}>

          <label>Name:</label>
          <Field
            name="name"
            component={renderField}
            type="text"
          />
          <label>Price:</label>
          <Field
            name="price"
            component={renderField}
            type="number"

          />
          <label>Description:</label>
          <Field
            name="description"
            component={renderField}
            type="text"
          />
        </form>

      </CardContent>
      <CardActions>
        <Button label="SUBMIT" color="green" variant="filled" handleClick={performSubmit}></Button>
      </CardActions>
    </React.Fragment>
  );
}
/*
function editItem() {
  const val = document.getElementById("editItemName").value;
  editWishlistItem("8WPy581hGYgpGHHs5WEqhaCE2Ys1", 0, val);
  console.log("test");
}
*/


const mapStateToProps = () => {
  const getDialogValues = selectors.getDialogValuesState();
  return state => ({
    values: getDialogValues(state)
  })
}

const tempSubmit = (values, dispatch) => dispatch(editWishlistItem());

const mapDispatchToProps = dispatch => ({
  performSubmit: () => dispatch(submit("editItem"))
});

export default reduxForm({
  form: "editItem",
  onSubmit: tempSubmit
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditItem)
);
