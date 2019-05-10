import { connect } from "react-redux";
import { actions as dialogActions } from "../../../../../../components/dialog";
import GroupList from "./GroupList";

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(dialogActions.openDialog("createGroup"))
});

export default connect(
  null,
  mapDispatchToProps
)(GroupList);
