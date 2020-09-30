import React from "react";
import _ from "lodash";

import { TableColumnConfig } from "../../types";
import { SortStateType, SortType } from "../../../../../hooks/useQuery";

import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { FixMeLater } from "../../../../../shared/types/common/FixMeLater";

import "./TableHeading.scss";

interface TableHeadingProps {
  config: TableColumnConfig<FixMeLater>;
  onSortChanged?: (field: string, type: SortStateType) => void;
  isSorted?: boolean;
  sortState?: SortStateType;
  sortIndex?: number | null;
}

const TableHeading: React.FC<TableHeadingProps> = ({
  config,

  onSortChanged,
  isSorted = true,
  sortState = "",
  sortIndex = null,
}) => {
  const states: SortStateType[] = ["", "desc", "asc"];

  const getNextState = (actualState: FixMeLater): number => {
    let nextState = actualState;
    actualState < states.length - 1 ? (nextState += 1) : (nextState = 0);
    return nextState;
  };

  const changeHeadingSortHandler = () => {
    if (isSorted) {
      const newIndex = getNextState(_.indexOf(states, sortState));
      onSortChanged && onSortChanged(config.field, states[newIndex]);
    }
  };

  let icon = null;
  switch (_.indexOf(states, sortState)) {
    case 0:
      icon = <UnfoldMoreIcon />;
      break;
    case 1:
      icon = <KeyboardArrowDownIcon />;
      break;
    case 2:
      icon = <KeyboardArrowUpIcon />;
      break;
    default:
      break;
  }

  return (
    <th
      onClick={changeHeadingSortHandler}
      className="table-heading"
      style={{
        cursor: isSorted ? "pointer" : "default",
      }}
    >
      <div className="table-heading__content">
        {config.name}
        {isSorted && (
          <div className="table-heading__sort-wrapper">
            {sortIndex && <span>{`${sortIndex}`}</span>}
            {icon}
          </div>
        )}
      </div>
    </th>
  );
};

export default TableHeading;
