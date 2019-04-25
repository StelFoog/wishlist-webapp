import React from "react";

import Button from "../../components/button";
import SvgIcon, { RoundKeyboardArrowDown } from "../../components/svgIcon";

import { connect } from "react-redux";
import { push } from "connected-react-router";

import "./startScreen.css";

const StartScreen = ({ handleCLick }) => (
  <div className="startScreen">
    <div className="homeTitle">
      <h1>Wishlists</h1>
    </div>
    <div className="authButtonContainer">
      <Button
        label="Log in with Facebook"
        variant="filled"
        color="#73359B"
        fontSize="1rem"
      />
      <Button
        label="Log in with Google"
        variant="outlined"
        color="#73359B"
        padding="1rem 1rem"
      />
    </div>
    <div className="downArrowContainer">
      <SvgIcon className="downArrow" ripple={true} handleCLick={handleCLick}>
        <RoundKeyboardArrowDown size={100} />
      </SvgIcon>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  handleCLick: () => dispatch(push("#next"))
});

export default connect(
  null,
  mapDispatchToProps
)(StartScreen);
