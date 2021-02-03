import React, { CSSProperties } from "react";

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
