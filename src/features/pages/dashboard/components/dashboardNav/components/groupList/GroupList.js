import React from "react";
import Ripple from "../../../../../../components/ripple";

class GroupList extends React.Component {
  componentDidMount() {
    const { fetchGroups } = this.props;
    fetchGroups();
  }

  render() {
    const { navigate, groups, user, selected, closeSideNav } = this.props;
    return (
      <React.Fragment>
        {groups.map(group => (
          <div
            key={group.uid}
            className={`group ${selected === group.uid && "active"}`}
            onClick={() => {
              navigate(`group/${group.uid}/${user.uid}`);
              closeSideNav();
            }}
          >
            <Ripple />
            <span> {group.title}</span>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default GroupList;
