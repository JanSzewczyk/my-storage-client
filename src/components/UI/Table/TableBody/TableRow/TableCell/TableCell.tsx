import React from "react";

import { TableColumnConfig } from "../../../types";

import "./TableCell.scss";

interface TableCellProps<TTable> {
  columnConfig: TableColumnConfig<TTable>;
  rowData: TTable;
  onClick?: (rowData: TTable) => void;
}

const TableCell = <TTable,>({
  columnConfig,
  rowData,
  onClick,
}: TableCellProps<TTable>) => {
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

export default TableCell;
