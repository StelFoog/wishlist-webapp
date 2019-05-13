import React from "react";

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
      <React.Fragment>
        {users.map(el => (
          <div>{el.name}</div>
        ))}
      </React.Fragment>
    );
  }
}

export default MemberList;
