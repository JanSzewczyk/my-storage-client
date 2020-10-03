import React from "react";
import _ from "lodash";

import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

import { TableColumnConfig } from "../../types";
import { SortStateType } from "../../../../../hooks/useQuery";

import "./TableHeading.scss";

interface TableHeadingProps<TTable> {
  config?: TableColumnConfig<TTable>;
  onSortChanged?: (field: keyof TTable, type: SortStateType) => void;
  isSorted: boolean;
  sortState?: SortStateType;
  sortIndex?: number | null;
}

const TableHeading = <TTable,>({
  config,
  onSortChanged,
  isSorted = true,
  sortState = "",
  sortIndex = null,
}: TableHeadingProps<TTable>) => {
  const states: SortStateType[] = ["", "desc", "asc"];

  const getNextState = (actualState: number): number => {
    let nextState = actualState;
    actualState < states.length - 1 ? (nextState += 1) : (nextState = 0);
    return nextState;
  };

  const changeHeadingSortHandler = () => {
    if (isSorted) {
      const newIndex = getNextState(_.indexOf(states, sortState));
      config && onSortChanged && onSortChanged(config.field, states[newIndex]);
    }
  };

  let icon = null;
  switch (_.indexOf(states, sortState)) {
    case 0:
      icon = <FaSort />;
      break;
    case 1:
      icon = <FaSortDown />;
      break;
    case 2:
      icon = <FaSortUp />;
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
        {config ? config.name : ""}
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
