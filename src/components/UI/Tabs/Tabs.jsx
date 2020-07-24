import React, { useState } from "react";
import PropTypes from "prop-types";

import TabTitle from "./TabTitle/TabTitle";

import "./Tabs.scss";

const Tabs = React.memo((props) => {
  const { children } = props;

  const [activeTab, setActiveTab] = useState(children.length !== 0 ? 0 : null);

  const titles = children.map((child, index) => (
    <TabTitle
      key={index}
      title={child.props.title}
      selected={activeTab === index}
      disabled={child.props.disabled}
      onSelect={() => setActiveTab(index)}
    />
  ));

  return (
    <div className={"tabs"}>
      <div className={"tabs__titles"}>{titles}</div>
      <div className={"tabs__contents"}>
        {children.length !== 0 && children[activeTab]}
      </div>
    </div>
  );
});

Tabs.propTypes = {
  children: PropTypes.node,
};

export default Tabs;
