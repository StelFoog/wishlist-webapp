import React from "react";
import "./pageHeader.css";

const PageHeader = ({ title, children }) => (
  <div className="pageHeader">
    <h1 className="headerTitle">{title}</h1>
    {children}
  </div>
);

export default PageHeader;
