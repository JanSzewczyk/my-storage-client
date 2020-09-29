import React from "react";
import _ from "lodash";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PersonIcon from "@material-ui/icons/Person";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { formatMoney } from "../../../../../shared/utils/currencyUtils";
import Table, { TableConfig } from "../../../../UI/Table";

import "./ActionTimeLineItem.scss";
import Action from "../../../../../shared/types/action/Action";

interface ActionTimeLineItemProps {
  action: Action;
  selected: boolean;
  onSelect: () => void;
}

const ActionTimeLineItem: React.FC<ActionTimeLineItemProps> = (props) => {
  const { action, selected, onSelect } = props;

  const config: TableConfig = {
    columns: [
      {
        field: "productName",
        name: "Product Name",
      },
      {
        field: "amount",
        name: "Amount",
      },
      {
        field: "productValue",
        name: "Value",
        converter: (value: number, rowData: any) =>
          formatMoney(value, rowData.currency),
      },
      {
        field: "totalValue",
        name: "Total",
        converter: (totalValue: number, rowData: any) =>
          formatMoney(totalValue, rowData.currency),
      },
    ],
  };

  return (
    <div className={"action-time-line-item"}>
      <div className={"action-time-line-item__header"}>
        <span>
          {action.action === "STORE" && <ArrowDownwardIcon />}
          {action.action === "REMOVE" && <ArrowUpwardIcon />}
          {action.action}
        </span>
        <span>
          <PersonIcon />
          {`${action.employeeFirstName} ${action.employeeLastName}`}
        </span>
        <span>
          {formatMoney(_.sumBy(action.items, "totalValue"), action.currency)}
        </span>
        <div
          className={"action-time-line-item__show-button"}
          onClick={onSelect}
        >
          {!selected ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          Show details
        </div>
      </div>
      {selected && (
        <div className={"action-time-line-item__content"}>
          <Table config={config} data={action.items} fontSize={14} />
        </div>
      )}
    </div>
  );
};

export default ActionTimeLineItem;
