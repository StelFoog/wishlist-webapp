import React, { Component } from "react";
import PropTypes from "prop-types";

import Tab from "./Tab";

import "./tabs.css";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
      currentTab: 0
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab }
    } = this;
    let currentTab;
    for (let i = 0; i < children.length; i++) {
      if (children[i].props.label === activeTab) currentTab = i;
    }

    console.log(currentTab);
    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map(child => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            return (
              <div className={`tab-active tab-${currentTab}`}>
                {child.props.children}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
