import React, { Component } from 'react';
import "./pageHeader.css";

const PageHeader = ({
  title,
  className = ""
}) => (
    <div className="pageHeader">
      <h1 className="headerTitle">{title}</h1>
    </div>
  );



export default PageHeader;
