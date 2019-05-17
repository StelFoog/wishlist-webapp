import React from "react";

import Paper from "../paper";

import Header from "./Header";
import Navigation from "./Navigation";
import Copyright from "./Copyright";

import "./footer.css";

const Footer = () => (
  <footer>
    <Paper elevation={5} className="footer-container">
      <Header />
      <Navigation />
      <Copyright />
    </Paper>
  </footer>
);

export default Footer;
