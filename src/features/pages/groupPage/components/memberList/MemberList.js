import React from "react";

const MemberList = ({ members = [] }) => (
  <React.Fragment>
    {members.map(el => (
      <div>{el}</div>
    ))}
  </React.Fragment>
);

export default MemberList;
