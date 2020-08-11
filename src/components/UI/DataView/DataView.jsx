import React from "react";
import PropTypes from "prop-types";

import "./DataView.scss";

const DataView = React.memo(({ label, data }) => {
  return (
    <div className={"data-view"}>
      <div className={"data-view__label"}>{label}</div>
      <div className={"data-view__data"}>{data}</div>
    </div>
  );
});

DataView.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
};

export default DataView;
