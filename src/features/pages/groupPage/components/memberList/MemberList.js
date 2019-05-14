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
    if (members !== prevProps.members) {
      getUsersWithUid(members);
    }
  }

  getUsersInGroup(members, users) {
    let array = [];
    members.forEach(member => {
      users[member] ? array.push(users[member]) : null;
    });
    return array;
  }

  render() {
    const { users, openForm, uid, navigate, members } = this.props;
    return (
      <div className="memberBar">
        <div className="memberContainer">
          {this.getUsersInGroup(members, users).map(user => (
            <div
              className="memberCard"
              onClick={() => navigate(`group/${uid}/${user.uid}`)}
            >
              <Ripple />
              <div className="memberPicture">
                <ProfilePicture src={user.profilePictureUrl} width={30} />
              </div>
              <div clasName="memberName">{user.name}</div>
            </div>
          ))}
          {/*users.map(user => (
            <div
              className="memberCard"
              onClick={() => navigate(`group/${uid}/${user.uid}`)}
            >
              <Ripple />
              <div className="memberPicture">
                <ProfilePicture src={user.profilePictureUrl} width={30} />
              </div>
              <div clasName="memberName">{user.name}</div>
            </div>
          ))*/}
        </div>
        <AddUser openForm={openForm} uid={uid} />
      </div>
    );
  }
}

export default MemberList;
