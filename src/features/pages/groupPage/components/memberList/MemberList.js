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

  render() {
    const { users } = this.props;
    return (
      <div className="memberBar">
        <div className="memberContainer">
          {users.map(user => (
            <div className="memberCard">
              <Ripple />
              <div className="memberPicture">
                <ProfilePicture src={user.profilePictureUrl} width={30} />
              </div>
              <div clasName="memberName">{user.name}</div>
            </div>
          ))}
        </div>
        <AddUser />
      </div>
    );
  }
}

export default MemberList;
