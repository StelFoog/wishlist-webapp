import React from "react";
/* Components */

import Footer from "./components/footer";

import StartScreen from "./StartScreen";
import IntroCard from "./IntroCard";
import Guide from "./Guide";

import "./homePage.css";

const HomePage = () => (
  <React.Fragment>
    <div className="homePage">
      <StartScreen />
      <IntroCard />
      <Guide />
    </div>
    <Footer />
  </React.Fragment>
);

export default HomePage;
