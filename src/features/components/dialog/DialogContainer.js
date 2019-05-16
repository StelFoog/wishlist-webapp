import { connect } from "react-redux";
// import { actions, selectors } from "./index";
import actions from "./actions";
import selectors from "./selectors";
import Dialog from "./Dialog";

const { closeDialog } = actions;

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeDialog())
});

const mapStateToProps = () => {
  const getDialogOpened = selectors.getDialogOpenedState();
  const getDialogVariant = selectors.getDialogVariantState();
  const getDialogValues = selectors.getDialogValuesState();
  return state => ({
    showDialog: getDialogOpened(state),
    variant: getDialogVariant(state),
    values: getDialogValues(state)
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog);
