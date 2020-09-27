import React from "react";

import { TableConfig } from "../../types";
import { FixMeLater } from "../../../../../shared/types/common/FixMeLater";

import TableCell from "./TableCell/TableCell";
import TableActionCell from "./TableActionCell/TableActionCell";

import "./TableRow.scss";

interface TableRowProps {
  config: TableConfig;
  data: FixMeLater[];
  onRowClick?: (rowData: FixMeLater) => void;
}

const TableRow: React.FC<TableRowProps> = ({ config, data, onRowClick }) => {
  return (
    <tr
      className="table-row"
      //   style={props.config.setRowStyle && props.config.setRowStyle(props.data)}
    >
      {config.columns.map((c, index) => (
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

export default TableRow;
