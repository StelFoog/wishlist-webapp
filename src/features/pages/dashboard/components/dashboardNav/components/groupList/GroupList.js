import React from "react";
import Ripple from "../../../../../../components/ripple";

class GroupList extends React.Component {
  componentDidMount() {
    const { fetchGroups } = this.props;
    fetchGroups();
  }

  render() {
    const { navigate, groups, user } = this.props;
    return (
      <React.Fragment>
        {groups.map(group => (
          <div
            className="group"
            onClick={() => navigate(`group/${group.uid}/${user.uid}`)}
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
