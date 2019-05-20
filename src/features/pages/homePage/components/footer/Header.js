import React from "react";
import logo from "../../../../../logo.svg";

const Header = () => (
  <div className="footer-header">
    <div className="footer-logo">
      <h3>Wishlist</h3>
      <img src={logo} alt="footer logo" />
    </div>
    <div className="footer-to-top">
      <a onClick={() => window.scrollTo(0, 0)}>Back to Top</a>
    </div>
  </div>
);

export default Header;
