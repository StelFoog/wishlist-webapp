import React from "react";

import { MemberList } from "./components";
import PageHeader from "../../components/pageHeader";
import "./groupPage.css";

import { onGroupChanged } from "../../lib/groups/db.js";

import GroupWishlist from "./components/groupWishlist";

class GroupPage extends React.Component {
  componentDidMount() {
    const { uid } = this.props.match.params;
    const { groups } = this.props;
    const group = groups.find(el => el.uid === uid);

    this.unlisten = onGroupChanged(
      uid,
      (props => {
        return updatedGroup => {
          props.updateCurrentGroup(updatedGroup);
        };
      })(this.props)
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { uid } = this.props.match.params;
    const group = this.props.groups.find(el => el.uid === uid);

    const user = this.props.user;

    return (
      <div
        className="page"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "100vh"
        }}
      >
        <div className="groupPageHeader">
          <PageHeader title={group.title} />
        </div>
        <div className="groupPage">
          <div className="memberBarContainer">
            <MemberList
              currentGroup={group}
              members={group.members}
              uid={uid}
            />
          </div>
          <GroupWishlist groupID={uid} userID={user} />
        </div>
      </div>
    );
  }
}

export default GroupPage;
