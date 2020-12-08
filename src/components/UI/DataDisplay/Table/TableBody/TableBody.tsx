import React from "react";

import { TableConfig } from "../types";

import TableRow from "./TableRow/TableRow";

interface TableBodyProps<TTable> {
  data: TTable[];
  config: TableConfig<TTable>;
  onRowClick?: (rowData: TTable) => void;
}

const TableBody = <TTable,>({
  data,
  config,
  onRowClick,
}: TableBodyProps<TTable>) => {
  return (
    <tbody className="table-body">
      {data.map((d: TTable, index: number) => (
        <TableRow<TTable>
          key={index}
          config={config}
          data={d}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
