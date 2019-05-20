import React from "react";
import ProfilePicture from "../../../../components/profilePicture";
import Ripple from "../../../../components/ripple";
import AddUser from "./AddUser";
import "./memberList.css";

class MemberList extends React.Component {
  componentDidMount() {
    const { getUsersWithUid, members } = this.props;
    getUsersWithUid(members);
  }

  componentDidUpdate(prevProps, prevState) {
    const { members, getUsersWithUid } = this.props;
    if (JSON.stringify(members) !== JSON.stringify(prevProps.members)) {
      getUsersWithUid(members);
    }
  }

  getFilteredUsers(filter, users) {
    let array = [];
    filter.forEach(element => {
      users[element] && array.push(users[element]);
    });
    return array;
  }

  render() {
    const {
      users,
      openForm,
      uid,
      navigate,
      members,
      currentGroup,
      fetchItems,
      currentUser
    } = this.props;
    return (
      <div className="memberBar">
        <div className="memberContainer">
          {this.getFilteredUsers(members, users).map(user => (
            <div
              key={user.uid}
              className="memberCard"
              onClick={() => {
                fetchItems({
                  groupID: uid,
                  userID: user.uid
                });
                navigate(`group/${uid}/${user.uid}`);
              }}
            >
              <Ripple />
              <div className="memberPicture">
                <ProfilePicture src={user.profilePictureUrl} width={30} />
              </div>
              <div className="memberName">{user.name}</div>
            </div>
          ))}
        </div>
        <AddUser currentUserUid={currentUser.uid} currentGroup={currentGroup} />
      </div>
    );
  }
}

export default MemberList;
