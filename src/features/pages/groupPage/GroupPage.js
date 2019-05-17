import React from "react";

import { MemberList } from "./components";
import Title from "../../components/wishlistTitle";
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
    const {
      match,
      groups,
      editProperties,
      deleteObject,
      leave,
      deleteGroup,
      user
    } = this.props;
    const { uid } = match.params;
    const currentUser = match.params.user;
    const group = groups.find(el => el.uid === uid);

    return (
      <div
        className="page"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div className="groupPageHeader">
          <Title
            title={group.title}
            type={"group"}
            editProperties={editProperties}
            uid={uid}
            deleteObject={deleteObject}
            leave={leave}
            user={currentUser}
            deleteObject={deleteGroup}
            isOwner={group.owner === user.uid}
          />
        </div>
        <div className="groupPage">
          <div className="memberBarContainer">
            <MemberList
              currentGroup={group}
              members={group.members}
              uid={uid}
              currentUser={user}
            />
          </div>
          <GroupWishlist groupID={uid} userID={currentUser} />
        </div>
      </div>
    );
  }
}
export default GroupPage;
