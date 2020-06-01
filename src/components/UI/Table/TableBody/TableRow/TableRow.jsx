import React from "react";
import PropTypes from "prop-types";
import TableCell from "./TableCell/TableCell";
import TableActionCell from "./TableActionCell/TableActionCell";

import "./TableRow.scss";

const TableRow = (props) => {
  const { config, data, onRowClick } = props;

  return (
    <tr
      className="table-row"
      //   style={props.config.setRowStyle && props.config.setRowStyle(props.data)}
    >
      {props.config.columns.map((c, index) => (
        <TableCell
          key={index}
          rowData={data}
          columnConfig={c}
          onClick={onRowClick}
        />
      ))}
      {config.actions && (
        <TableActionCell
          key={"actions"}
          actions={config.actions}
          rowData={data}
        />
      )}
    </tr>
  );
};

TableRow.propTypes = {
  config: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        converter: PropTypes.func,
      })
    ).isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
      })
    ),
  }).isRequired,
  data: PropTypes.object.isRequired,
  onRowClick: PropTypes.func,
};

export default TableRow;
