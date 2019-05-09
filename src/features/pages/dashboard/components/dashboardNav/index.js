import { push } from "connected-react-router";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";

const mapDispatchToProps = dispatch => ({
  navigate: path => dispatch(push(`/dashboard/${path}`))
});

export default connect(
  null,
  mapDispatchToProps
)(DashboardNav);
