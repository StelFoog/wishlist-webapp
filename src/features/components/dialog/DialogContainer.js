import { connect } from "react-redux";
import { actions, selectors } from "./index";
import Dialog from "./Dialog";

const { closeDialog } = actions;

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeDialog())
});

const mapStateToProps = () => {
  const getDialogOpened = selectors.getDialogOpenedState();
  const getDialogVariant = selectors.getDialogVariantState();
  return state => ({
    showDialog: getDialogOpened(state),
    variant: getDialogVariant(state)
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog);
