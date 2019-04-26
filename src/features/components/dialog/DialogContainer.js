import { connect } from "react-redux";
import { actions, selectors } from "./index";
import Dialog from "./Dialog";

const { closeDialog } = actions;

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeDialog())
});

const mapStateToProps = () => {
  const getDialogOpenedState = selectors.getDialogOpenedState();
  const getDialogContentState = selectors.getDialogContentState();
  return state => ({
    showDialog: getDialogOpenedState(state),
    content: getDialogContentState(state)
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog);
