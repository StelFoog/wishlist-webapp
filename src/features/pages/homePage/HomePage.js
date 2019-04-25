import React from "react";

import StartScreen from "./StartScreen";
import IntroCard from "./IntroCard";

import "./homePage.css";

const HomePage = ({ handleCLick }) => (
  <div className="homePage">
    <StartScreen />
    <IntroCard />
  </div>
);

export default HomePage;
