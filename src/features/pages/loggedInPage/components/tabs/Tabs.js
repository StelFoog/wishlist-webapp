import React from "react";

import "./tabs.css";

class Tabs extends React.Component {
  render() {
    const { fullWidth = false, children } = this.props;
    return <div className="tabs">{children}</div>;
  }
}

export default Tabs;
