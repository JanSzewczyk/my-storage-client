import React from "react";

import Button from "../../../../Button/Button";

import { TableActionConfig } from "../../../types";

import "./TableActionCell.scss";

interface TableActionCellProps<TTable> {
  actions: TableActionConfig<TTable>[];
  rowData: TTable;
}

const TableActionCell = <TTable,>({
  actions,
  rowData,
}: TableActionCellProps<TTable>) => {
  return (
    <td className="table-action-cell">
      <div className={"table-action-cell__buttons"}>
        {actions.map((action, index) => {
          return (
            <Button key={index} onClick={() => action.action(rowData)}>
              {action.name}
            </Button>
          );
        })}
      </div>
    </td>
  );
};

export default TableActionCell;
