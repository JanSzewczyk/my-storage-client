import React from "react";
import PropTypes from "prop-types";

import "./TableCell.scss";

const TableCell = (props) => {
  const { columnConfig, rowData, onClick } = props;

  let cellContent = columnConfig.converter
    ? columnConfig.converter(rowData[columnConfig.field], rowData)
    : rowData[columnConfig.field];

  return (
    <td
      className="table-cell"
      onClick={onClick && (() => onClick(rowData))}
      style={{
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {cellContent}
    </td>
  );
};

TableCell.propTypes = {
  onClick: PropTypes.func,
  columnConfig: PropTypes.shape({
    field: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    converter: PropTypes.func,
  }).isRequired,

  rowData: PropTypes.object.isRequired,
};

export default TableCell;
