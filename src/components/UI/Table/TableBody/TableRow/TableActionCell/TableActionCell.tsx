import React from "react";

import Button from "../../../../Button/Button";

import { TableActionConfig } from "../../../types";
import { FixMeLater } from "../../../../../../shared/types/common/FixMeLater";

import "./TableActionCell.scss";

interface TableActionCellProps {
  actions: TableActionConfig[];
  rowData: FixMeLater;
}

const TableActionCell: React.FC<TableActionCellProps> = ({
  actions,
  rowData,
}) => {
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
