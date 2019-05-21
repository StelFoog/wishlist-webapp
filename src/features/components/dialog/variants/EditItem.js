import React from "react";
import { connect } from "react-redux";
import { selectors } from "../";
import { CardHeader, CardContent, CardActions } from "../../card";
import { Field, reduxForm, submit } from "redux-form";
import renderField from "../../wishListForm/validate";
import Button from "../../button";
import { actions } from "../../../lib/wishlistItems";

const { editWishlistItem } = actions;

const EditItem = ({ handleSubmit, handleClose, values, performSubmit }) => {
  const { item } = values;
  return (
    <React.Fragment>
      <CardHeader>{"Edit wishlist item"}</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            label={"Name"}
            component={renderField}
            type="text"
          />
          <Field
            name="price"
            label={"Price"}
            component={renderField}
            type="number"
          />
          <Field
            name="description"
            label={"Description"}
            component={renderField}
            type="text"
          />
          <Field
            name="websitelink"
            label={"Website link"}
            component={renderField}
            type="text"
          />
        </form>
      </CardContent>
      <CardActions>
        <Button
          label="SUBMIT"
          color="var(--color-accept)"
          variant="text"
          handleClick={performSubmit}
        />
      </CardActions>
    </React.Fragment>
  );
};
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
  });
};

const tempSubmit = (values, dispatch) => dispatch(editWishlistItem());

const mapDispatchToProps = dispatch => ({
  performSubmit: () => dispatch(submit("editItem"))
});

export default reduxForm({
  form: "editItem",
  onSubmit: tempSubmit,
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditItem)
);
