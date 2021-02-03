import React, { CSSProperties } from "react";

import "./TableSelectCell.scss";

interface TableSelectCellProps<TTable> {
  rowData: TTable;
  checked: boolean;
  onChange: () => void;
  setRowStyle?: (rowData: TTable) => CSSProperties;
}

const TableSelectCell = <TTable,>({
  rowData,
  checked,
  onChange,
  setRowStyle,
}: TableSelectCellProps<TTable>) => {
  return (
    <td
      className="table-select-cell"
      style={setRowStyle && setRowStyle(rowData)}
    >
      <div className="table-select-cell__content">
        <input type="checkbox" checked={checked} onChange={onChange} />
      </div>
    </td>
  );
};

export default TableSelectCell;
