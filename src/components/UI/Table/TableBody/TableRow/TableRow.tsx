import React from "react";

import { TableColumnConfig, TableConfig } from "../../types";
import TableActionCell from "./TableActionCell/TableActionCell";

import TableCell from "./TableCell/TableCell";

import "./TableRow.scss";

interface TableRowProps<TTable> {
  config: TableConfig<TTable>;
  data: TTable;
  onRowClick?: (rowData: TTable) => void;
}

const TableRow = <TTable,>({
  config,
  data,
  onRowClick,
}: TableRowProps<TTable>) => {
  return (
    <tr
      className="table-row"
      //   style={props.config.setRowStyle && props.config.setRowStyle(props.data)}
    >
      {config.columns.map((c: TableColumnConfig<TTable>, index: number) => (
        <TableCell<TTable>
          key={index}
          rowData={data}
          columnConfig={c}
          onClick={onRowClick}
        />
      ))}
      {config.actions && (
        <TableActionCell<TTable>
          key={"actions"}
          actions={config.actions}
          rowData={data}
        />
      )}
    </tr>
  );
};

export default TableRow;
