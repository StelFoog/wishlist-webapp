import LoggedInPage from "./LoggedInPage";
import { connect } from "react-redux";
import { actions } from "../../components/dialog";

const { openDialog } = actions;

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(openDialog("newWishlist"))
});

export default connect(
  null,
  mapDispatchToProps
)(LoggedInPage);
