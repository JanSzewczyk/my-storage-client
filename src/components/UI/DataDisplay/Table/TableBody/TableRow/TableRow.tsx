import _ from "lodash";
import React from "react";

import { TableColumnConfig, TableConfig } from "../../types";
import TableActionCell from "./TableActionCell/TableActionCell";

import TableCell from "./TableCell/TableCell";

import "./TableRow.scss";
import TableSelectCell from "./TableSelectCell/TableSelectCell";

interface TableRowProps<TTable> {
  config: TableConfig<TTable>;
  data: TTable;
  onRowClick?: (rowData: TTable) => void;
  selectable: boolean;
  selected: TTable[];
  onSelectCellClick: (selectedObject: TTable) => void;
}

const TableRow = <TTable,>({
  config,
  data,
  onRowClick,
  selectable,
  selected,
  onSelectCellClick,
}: TableRowProps<TTable>) => {
  const isSelected: boolean = Boolean(
    _.find(selected, (o) => _.isEqual(o, data))
  );

  let tableRowClasses: string[] = ["table-row"];
  if (isSelected) tableRowClasses.push("table-row__selected");

  return (
    <tr className={tableRowClasses.join(" ")}>
      {selectable && (
        <TableSelectCell<TTable>
          rowData={data}
          checked={isSelected}
          onChange={() => onSelectCellClick(data)}
          setRowStyle={config.setRowStyle}
        />
      )}
      {config.columns.map((c: TableColumnConfig<TTable>, index: number) => (
        <TableCell<TTable>
          key={index}
          rowData={data}
          columnConfig={c}
          setRowStyle={config.setRowStyle}
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
