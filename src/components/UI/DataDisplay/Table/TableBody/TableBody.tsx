import React from "react";

import { TableConfig } from "../types";

import TableRow from "./TableRow/TableRow";

interface TableBodyProps<TTable> {
  data: TTable[];
  config: TableConfig<TTable>;
  onRowClick?: (rowData: TTable) => void;
  selectable: boolean;
  selected: TTable[];
  onSelectCellClick: (selectedObject: TTable) => void;
}

const TableBody = <TTable,>({
  data,
  config,
  onRowClick,
  selectable,
  selected,
  onSelectCellClick,
}: TableBodyProps<TTable>) => {
  return (
    <tbody className="table-body">
      {data.map((d: TTable, index: number) => (
        <TableRow<TTable>
          key={index}
          config={config}
          data={d}
          onRowClick={onRowClick}
          selectable={selectable}
          selected={selected}
          onSelectCellClick={onSelectCellClick}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
