import React, { useState, useMemo } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { FixMeLater } from "../../../shared/types/common/FixMeLater";

import TabTitle from "./TabTitle/TabTitle";

import "./Tabs.scss";

interface TabsProps extends PropsWithChildren {
  className?: string;
}

const Tabs: React.FC<TabsProps> = React.memo(({ children, className }) => {
  const setFirstActiveTab = (): number | null => {
    if (children.length !== 0)
      for (const index in children)
        if (!children[index].props.disabled) return Number(index);

    return null;
  };

  const [activeTab, setActiveTab] = useState<number | null>(
    setFirstActiveTab()
  );

  const titles = useMemo(
    () =>
      children.map((child: FixMeLater, index: number) => (
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

export default Tabs;
