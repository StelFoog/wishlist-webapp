import React from "react";
import { MemberList } from "./components";

class GroupPage extends React.Component {
  render() {
    const { uid } = this.props.match.params;
    const { groups } = this.props;
    const group = groups.find(el => el.uid === uid);

    return (
      <div>
        <MemberList members={group.members} />
      </div>
    );
  }
}

export default GroupPage;
