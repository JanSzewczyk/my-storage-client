import React from "react";
import PropTypes from "prop-types";

import TableRow from "./TableRow/TableRow";

const TableBody = (props) => {
  const { data, config, onRowClick } = props;

  return (
    <tbody className="table-body">
      {data.map((d, index) => (
        <TableRow
          key={index}
          config={config}
          data={d}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
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
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default TableBody;
