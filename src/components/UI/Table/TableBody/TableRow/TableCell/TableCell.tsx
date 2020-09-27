import React from "react";

import { TableColumnConfig } from "../../../types";
import { FixMeLater } from "../../../../../../shared/types/common/FixMeLater";

import "./TableCell.scss";

interface TableCellProps {
  columnConfig: TableColumnConfig;
  rowData: FixMeLater;
  onClick?: (rowData: FixMeLater) => void;
}

const TableCell: React.FC<TableCellProps> = ({
  columnConfig,
  rowData,
  onClick,
}) => {
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
