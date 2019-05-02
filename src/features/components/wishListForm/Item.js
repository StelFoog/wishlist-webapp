import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import renderField, { required } from "./validate";

class ItemAddition extends React.Component {
  handleSubmit(data) {
    console.log("Submission received!", data);
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <div>
          <label htmlFor="Item Name">Item name</label>
          <div>
            <Field
              name="item"
              component={renderField}
              type="text"
              placeholder="Item"
              validate={required}
            />
          </div>
          <label htmlFor="How many?">How many?</label>
          <div>
            <Field
              name="numberOfItems"
              component="input"
              type="number"
              pattern="![e,+,-,*,/]"
            />
          </div>
          <label htmlFor="Estimated price">Estimated price</label>
          <div>
            <Field
              name="price"
              component="input"
              type="number"
              pattern="![e,+,-,*,/]"
            />
          </div>
          <label htmlFor="Wish priority">Wish priority</label>
          <div>
            <Field
              name="priority"
              component="select"
              placeholder="Wish priority"
            >
              <option>none</option>
              <option>low</option>
              <option>middle</option>
              <option>high</option>
            </Field>
          </div>
          <label htmlFor="Website link">Website link</label>
          <div>
            <Field name="weblink" component="input" type="text" />
            {/*Fixa Url compatibiltet och check*/}
          </div>
          <button type="submit">Subimt Item</button>
        </div>
      </form>
    );
  }
}

// Super Getto plz remove

// ItemAddition = reduxForm({
//   form: "itemAdd"
// })(ItemAddition);
//
// const mapStateToProps = state => {
//   return {
//     currentUser: state.currentUser
//   };
// };
//
// export default connect(mapStateToProps)(withAuth(ItemAddition));
