import { push } from "connected-react-router";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import { getUser } from "../../../../lib/authentication/selectors";
import { actions as dialogActions } from "../../../../components/dialog";

const mapStateToProps = () => {
  return state => ({
    user: getUser(state)
  });
};

const mapDispatchToProps = dispatch => ({
  navigate: path => dispatch(push(`/dashboard/${path}`)),
  openForm: () => dispatch(dialogActions.openDialog("createGroup"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNav);
