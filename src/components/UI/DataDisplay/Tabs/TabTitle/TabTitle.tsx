import React from "react";

import "./TabTitle.scss";

interface TabTitleProps {
  onSelect: () => void;
  title: string;
  disabled?: boolean;
  selected: boolean;
}

const TabTitle: React.FC<TabTitleProps> = ({
  onSelect,
  title,
  disabled,
  selected,
}) => {
  let tabTitleClasses = ["tabs__title"];
  selected && tabTitleClasses.push("tabs__title--selected");
  disabled && tabTitleClasses.push("tabs__title--disabled");

  return (
    <div
      className={tabTitleClasses.join(" ")}
      onClick={!selected && !disabled ? onSelect : undefined}
    >
      {title}
    </div>
  );
};

export default TabTitle;
