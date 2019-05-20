import React from "react";

import { MemberList, ShowMemberListButton } from "./components";
import Title from "../../components/wishlistTitle";
import "./groupPage.css";

import { onGroupChanged } from "../../lib/groups/db.js";

import GroupWishlist from "./components/groupWishlist";

class GroupPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggleShowMemberList = this.toggleShowMemberList.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      showMemberList: false
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

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
    document.removeEventListener("mousedown", this.handleClickOutside);
    this.unlisten();
  }

  toggleShowMemberList() {
    const { showMemberList } = this.state;
    this.setState({ showMemberList: !showMemberList });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.toggleShowMemberList();
    }
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

    const { showMemberList } = this.state;
    console.log(showMemberList);
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
          <div
            ref={showMemberList ? this.setWrapperRef : ""}
            className={`memberBarContainer ${showMemberList ? "active" : ""}`}
          >
            <MemberList
              currentGroup={group}
              members={group.members}
              uid={uid}
              currentUser={user}
            />
          </div>
          <GroupWishlist groupID={uid} userID={currentUser} />
        </div>
        <div className="showMembersButton">
          <ShowMemberListButton
            showMemberListToggle={this.toggleShowMemberList}
          />
        </div>
      </div>
    );
  }
}
export default GroupPage;
