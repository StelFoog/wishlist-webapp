import React from "react";

import Button from "../../components/button";

import MaterialIcon from "material-icons-react";
import Ripple from "../../components/ripple";
import "./homePage.css";

class HomePage extends React.Component {
  render() {
    return (
      <div className="content">
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
          <div className="downArrow">
            <Ripple />
            <MaterialIcon icon="keyboard_arrow_down" size={100} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
