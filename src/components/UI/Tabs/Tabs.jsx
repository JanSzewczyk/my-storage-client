import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

import TabTitle from "./TabTitle/TabTitle";

import "./Tabs.scss";

const Tabs = React.memo((props) => {
  const { children } = props;

  const setFirstActiveTab = () => {
    if (children.length !== 0) {
      for (const index in children) {
        if (!children[index].props.disabled) return Number(index);
      }
    }

    return null;
  };

  const [activeTab, setActiveTab] = useState(setFirstActiveTab());

  console.log("test", setFirstActiveTab());

  const titles = useMemo(
    () =>
      children.map((child, index) => (
        <TabTitle
          key={index}
          title={child.props.title}
          selected={activeTab === index}
          disabled={child.props.disabled}
          onSelect={() => setActiveTab(index)}
        />
      )),
    [activeTab, children]
  );

  return (
    <div className={"tabs"}>
      <div className={"tabs__titles"}>{titles}</div>
      <div className={"tabs__contents"}>
        {activeTab !== null && children[activeTab]}
      </div>
    </div>
  );
});

Tabs.propTypes = {
  children: PropTypes.node,
};

export default Tabs;
