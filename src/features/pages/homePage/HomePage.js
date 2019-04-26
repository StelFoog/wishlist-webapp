import React from "react";

/* Components */

import Footer from "../../components/footer";

import StartScreen from "./StartScreen";
import IntroCard from "./IntroCard";
import Guide from "./Guide";

import "./homePage.css";

const HomePage = ({ handleCLick }) => (
  <React.Fragment>
    <div className="homePage">
      <StartScreen />
      <IntroCard />
      <Guide />
    </div>
    <Footer />
  </React.Fragment>
);

const mapDispatchToProps = dispatch => ({
  openDialog: () =>
    dispatch(openDialog({ body: <div>hej</div>, header: "hej" }))
});

export default connect(
  null,
  mapDispatchToProps
)(HomePage);
