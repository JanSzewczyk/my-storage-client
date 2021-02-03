import React from "react";
import _ from "lodash";

import Action from "../../../../shared/types/action/Action";
import Item from "../../../../shared/types/item/Item";
import { ActionType } from "../../../../shared/constants";
import { formatMoney } from "../../../../shared/utils/currencyUtils";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  LevelDownAltIcon,
  LevelUpAltIcon,
  UserIcon,
} from "../../../UI/DataDisplay/Icons";

import "./ActionTimeLineItem.scss";
import Table, { TableConfig } from "../../../UI/DataDisplay/Table";
import Tooltip from "../../../UI/DataDisplay/Tooltip";
import ItemTooltipContent from "./ItemTooltipContent/ItemTooltipContent";

interface ActionTimeLineItemProps {
  action: Action;
  selected: boolean;
  onSelect: () => void;
}

const ActionTimeLineItem: React.FC<ActionTimeLineItemProps> = (props) => {
  const { action, selected, onSelect } = props;

  const config: TableConfig<Item> = {
    columns: [
      {
        field: "productName",
        name: "Product Name",
        converter: (productName: string, item: Item) => (
          <Tooltip text={<ItemTooltipContent item={item} />}>
            <span>{productName}</span>
          </Tooltip>
        ),
      },
      {
        field: "amount",
        name: "Amount",
      },
      {
        field: "productValue",
        name: "Value",
        converter: (value: number, rowData: Item) =>
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
        <span className={"action-time-line-item__header--action"}>
          {action.action === ActionType.STORE && <LevelDownAltIcon />}
          {action.action === ActionType.REMOVE && <LevelUpAltIcon />}
          {action.action}
        </span>
        <span className={"action-time-line-item__header--data"}>
          <UserIcon />
          {`${action.employeeFirstName} ${action.employeeLastName}`}
        </span>

        <span className={"action-time-line-item__header--data"}>
          {formatMoney(_.sumBy(action.items, "totalValue"), action.currency)}
        </span>
        <div
          className={"action-time-line-item__show-button"}
          onClick={onSelect}
        >
          Show details
          {!selected ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </div>
      </div>
      {selected && (
        <div className={"action-time-line-item__content"}>
          <Table<Item> config={config} data={action.items} fontSize={14} />
        </div>
      )}
    </div>
  );
};

export default ActionTimeLineItem;
