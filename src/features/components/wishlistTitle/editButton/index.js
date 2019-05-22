import EditButton from "./EditButton";
import { connect } from "react-redux";
import { actions } from "../../../lib/wishlists";

const { editToggle } = actions;

const mapDispatchToProps = dispatch => ({
  toggleEdit: () => dispatch(editToggle())
});

export default connect(
  null,
  mapDispatchToProps
)(EditButton);
