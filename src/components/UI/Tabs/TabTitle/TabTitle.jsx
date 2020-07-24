import React from "react";
import PropTypes from "prop-types";

import "./TabTitle.scss";

const TabTitle = (props) => {
  const { onSelect, title, disabled, selected } = props;

  let TTClasses = ["tabs__title"];
  selected && TTClasses.push("tabs__title--selected");
  disabled && TTClasses.push("tabs__title--disabled");

  return (
    <div
      className={TTClasses.join(" ")}
      onClick={!selected && !disabled ? onSelect : undefined}
    >
      {title}
    </div>
  );
};

TabTitle.propTypes = {
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.bool.isRequired,
};

export default TabTitle;
