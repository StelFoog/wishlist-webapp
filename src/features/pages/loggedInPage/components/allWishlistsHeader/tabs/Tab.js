import React from "react";

const Tab = ({ label, className, ID, handleClick, index }) => (
  <a onClick={() => handleClick(index)}>
    <div className={`tab ${className}`} id={ID}>
      <h2>{label}</h2>
    </div>
  </a>

);

export default Tab;
