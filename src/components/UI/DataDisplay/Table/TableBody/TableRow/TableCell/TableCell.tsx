import React, { CSSProperties } from "react";

import { TableColumnConfig } from "../../../types";

import "./TableCell.scss";

interface TableCellProps<TTable> {
  columnConfig: TableColumnConfig<TTable>;
  rowData: TTable;
  onClick?: (rowData: TTable) => void;
  setRowStyle?: (rowData: TTable) => CSSProperties;
}

const TableCell = <TTable,>({
  columnConfig,
  rowData,
  onClick,
  setRowStyle,
}: TableCellProps<TTable>) => {
  let tableCellClasses: string[] = ["table-cell"];
  if (columnConfig.className) tableCellClasses.push(columnConfig.className);

  let cellContent = columnConfig.converter
    ? columnConfig.converter(rowData[columnConfig.field], rowData)
    : rowData[columnConfig.field];

  let tableCellStyles: CSSProperties = {};
  if (columnConfig.style)
    tableCellStyles = { ...tableCellStyles, ...columnConfig.style };
  if (setRowStyle)
    tableCellStyles = { ...tableCellStyles, ...setRowStyle(rowData) };
  if (columnConfig.setCellStyle)
    tableCellStyles = {
      ...tableCellStyles,
      ...columnConfig.setCellStyle(rowData[columnConfig.field], rowData),
    };

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
        ...tableCellStyles,
      }}
    >
      {cellContent}
    </td>
  );
};

export default TableCell;
