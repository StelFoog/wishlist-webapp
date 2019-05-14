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
    const { users, openForm, uid, navigate, members } = this.props;
    return (
      <div className="memberBar">
        <div className="memberContainer">
          {this.getFilteredUsers(members, users).map(user => (
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
        </div>
        <AddUser openForm={openForm} uid={uid} />
      </div>
    );
  }
}

export default MemberList;
