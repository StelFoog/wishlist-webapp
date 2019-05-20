import React from "react";
import { connect } from "react-redux";

import { MemberList, ShowMemberListButton } from "./components";
import Title from "../../components/wishlistTitle";
import "./groupPage.css";

import { onGroupChanged } from "../../lib/groups/db.js";

import GroupWishlist from "./components/groupWishlist";

import dialogActions from "../../components/dialog/actions.js";

const { openDialog } = dialogActions;

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
      leave,
      deleteGroup,
      user,
      confirmDelete
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
        <Title
          title={group.title}
          type={"group"}
          editProperties={editProperties}
          uid={uid}
          leave={leave}
          user={currentUser}
          deleteObject={confirmDelete(deleteGroup, group.title)}
          isOwner={group.owner === user.uid}
        />
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

const mapDispatchToProps = dispatch => ({
  confirmDelete: (deleteGroup, groupTitle) => (
    (groupId, userId) => {
      dispatch(openDialog("yesNo", {
        title: 
          "Are you sure you want to delete the group \"" + groupTitle + "\"?",
        onYes: () => (deleteGroup(groupId, userId))
      }));
    }
  )
});

export default connect(
  null,
  mapDispatchToProps
)(GroupPage);
