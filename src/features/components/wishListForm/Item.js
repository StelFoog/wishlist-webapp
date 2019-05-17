import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import renderField, { required } from "./validate";
import { actions } from "../../lib/wishlistItems";

const { createWishlistItem } = actions;

const ItemAddition = ({ handleSubmit, handleCreateItem }) => (
  <form onSubmit={handleSubmit(handleCreateItem)}>
    <div>
      <div>
        <label htmlFor="Item Name">Item name</label>
        <Field
          name="item"
          component={renderField}
          type="text"
          placeholder="Item"
          validate={required}
        />
      </div>
      <div>
        <label htmlFor="Website link">Website link</label>
        <Field name="weblink" component="input" type="url" />
        {/*Fixa Url compatibiltet och check*/}
      </div>
      <div>
        <label htmlFor="Estimated price">Estimated price</label>
        <Field
          name="price"
          component="input"
          type="number"
          pattern="![e,+,-,*,/]"
        />
      </div>
      <div>
        <label htmlFor="How many?">How many?</label>
        <Field
          name="numberOfItems"
          component="input"
          type="number"
          pattern="![e,+,-,*,/]"
        />
      </div>
      <div>
        <label htmlFor="Wish priority">Wish priority</label>
        <Field name="priority" component="select" placeholder="Wish priority">
          <option>none</option>
          <option>low</option>
          <option>middle</option>
          <option>high</option>
        </Field>
      </div>
      <button type="submit">Subimt Item</button>
    </div>
  </form>
);

const mapDispatchToProps = dispatch => ({
  handleCreateItem: () => dispatch(createWishlistItem(1))
});

export default reduxForm({
  form: "itemAdd"
})(
  connect(
    null,
    mapDispatchToProps
  )(ItemAddition)
);
