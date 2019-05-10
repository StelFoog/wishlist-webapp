import React from "react";
import Ripple from "../../../../../../components/ripple";

const GroupList = ({ openForm, groups, navigate }) => (
  <React.Fragment>
    {groups.map(group => (
      <div className="group" onClick={() => navigate(`group/${group.uid}`)}>
        <Ripple />
        <span> {group.title}</span>
      </div>
    ))}
    <div className="group" onClick={openForm}>
      <Ripple />
      <span>Add new group</span>
    </div>
  </React.Fragment>
);

export default GroupList;
