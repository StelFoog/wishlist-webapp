import React from "react";
import { push } from "connected-react-router";

import Button from "../../components/button";
import SvgIcon, { RoundKeyboardArrowDown } from "../../components/svgIcon";

import { connect } from "react-redux";
import { actions } from "../../lib/authentication/";
import { NavHashLink as NavLink } from "react-router-hash-link";

import "./startScreen.css";

const { authenticateFacebook } = actions;


const StartScreen = ({ handleDownClick, handleFacebookCLick }) => (
  <div className="startScreen">
    <div className="startBackground" />
    <div className="startContent">
      <div className="homeTitle">
        <div className="titleContainer">
          <h1>Wishlists</h1>
          <h5>Where all your wishes come true</h5>
        </div>
      </div>
      <div className="authButtonContainer">
        <Button
          handleClick={handleFacebookCLick}
          label="Log in with Facebook"
          variant="outlined"
          color="var(--color-lighter)"
        />
      </div>
      <div className="downArrowContainer">
        <NavLink to="#intro" smooth>
          <SvgIcon className="downArrow" handleCLick={handleDownClick}>
            <RoundKeyboardArrowDown size={100} color="var(--color-lighter)" />
          </SvgIcon>
        </NavLink>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  handleDownClick: () => dispatch(push("#intro")),
  handleFacebookCLick: () => dispatch(authenticateFacebook())
});

export default connect(
  null,
  mapDispatchToProps
)(StartScreen);
