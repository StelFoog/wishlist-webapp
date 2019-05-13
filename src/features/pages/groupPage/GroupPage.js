import React from "react";
import { MemberList } from "./components";
import PageHeader from "../../components/pageHeader";
import "./groupPage.css";
class GroupPage extends React.Component {
  render() {
    const { uid } = this.props.match.params;
    const { groups } = this.props;
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
        <PageHeader title={group.title} />
        <div className="groupPage">
          <MemberList members={group.members} uid={uid} />
        </div>
      </div>
    );
  }
}

export default GroupPage;
