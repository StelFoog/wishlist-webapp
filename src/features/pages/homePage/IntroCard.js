import React from "react";

import Paper from "../../components/paper";

import "./introCard.css";

const IntroCard = () => (
  <Paper elevation={2}>
    <div className="introCard" id="intro">
      <div className="introImage" />
      <div className="introText">
        <h3>
          <i>Have fun, make lists</i>
        </h3>
        <p>
          It's easy! Make a list, add all the items you want to it and share it
          with people. Everyone you shared it with can then plan for what gifts
          they are to give.
          <br />
          <br />
          For an event or other ocation where any people are all going to give
          eachother gifts there are <b>groups</b>. Everyone in a group has a
          wishlist specific for the group that everyone else in the group can
          see and claim items in.
        </p>
      </div>
    </div>
  </Paper>
);

export default IntroCard;
