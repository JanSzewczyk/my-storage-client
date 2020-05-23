import React from "react";
import PropTypes from "prop-types";

import "./DataView.scss";

const DataView = (props) => {
  const { label, data } = props;
  return (
    <div className={"data-view"}>
      <div className={"data-view__label"}>{label}</div>
      <div className={"data-view__data"}>{data}</div>
    </div>
  );
};

DataView.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DataView;
