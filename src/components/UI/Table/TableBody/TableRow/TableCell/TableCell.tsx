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
  let tableCellClasses: string[] = ["table-cell"];
  if (columnConfig.className) tableCellClasses.push(columnConfig.className);

  let cellContent = columnConfig.converter
    ? columnConfig.converter(rowData[columnConfig.field], rowData)
    : rowData[columnConfig.field];

  return (
    <td
      className={tableCellClasses.join(" ")}
      onClick={
        onClick && columnConfig.clickable !== false
          ? () => onClick(rowData)
          : undefined
      }
      style={{
        cursor: onClick ? "pointer" : "default",
        ...columnConfig.style,
      }}
    >
      {cellContent}
    </td>
  );
};

export default TableCell;
