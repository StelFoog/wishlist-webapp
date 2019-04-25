import React from "react";

import Button from "../../components/button";
import SvgIcon, { RoundKeyboardArrowDown } from "../../components/svgIcon";

import { connect } from "react-redux";
import { push } from "connected-react-router";
import { NavHashLink as NavLink } from "react-router-hash-link";

import "./startScreen.css";

const StartScreen = ({ handleCLick }) => (
  <div className="startScreen">
    <div className="homeTitle">
      <h1>Wishlists</h1>
    </div>
    <div className="authButtonContainer">
      <Button label="Log in with Facebook" variant="filled" color="#73359B" />
      <Button label="Log in with Google" variant="outlined" color="#73359B" />
    </div>
    <div className="downArrowContainer">
      <NavLink to="#intro" smooth>
        <SvgIcon className="downArrow" handleCLick={handleCLick}>
          <RoundKeyboardArrowDown size={100} />
        </SvgIcon>
      </NavLink>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  handleCLick: () => dispatch(push("#intro"))
});

export default connect(
  null,
  mapDispatchToProps
)(StartScreen);
