import React from "react";

import StartScreen from "./StartScreen";
import IntroCard from "./IntroCard";
import Guide from "./Guide";

import "./homePage.css";

const HomePage = ({ handleCLick }) => (
  <div className="homePage">
    <StartScreen />
    <IntroCard />
    <Guide />
  </div>
);

export default HomePage;
