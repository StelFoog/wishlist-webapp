import { push } from "connected-react-router";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import { getUser } from "../../../../lib/authentication/selectors";

const mapStateToProps = () => {
  return state => ({
    user: getUser(state)
  });
};

const mapDispatchToProps = dispatch => ({
  navigate: path => dispatch(push(`/dashboard/${path}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNav);
