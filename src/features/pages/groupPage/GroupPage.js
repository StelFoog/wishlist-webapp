import React from "react";
import { MemberList } from "./components";
import PageHeader from "../../components/pageHeader";
import "./groupPage.css";
import GroupWishlist from "./components/groupWishlist";

const GroupPage = ({ match, groups }) => {
  const { uid, user } = match.params;
  const group = groups.find(el => el.uid === uid);
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
          <MemberList currentGroup={group} members={group.members} uid={uid} />
        </div>
        <GroupWishlist groupID={uid} userID={user} />
      </div>
    </div>
  );
};

export default GroupPage;
