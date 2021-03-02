import React from "react";
import _ from "lodash";

import { TableColumnConfig } from "../../types";
import { SortStateType } from "../../../../../../hooks/useQuery";

import {
  SortDownIcon,
  SortIcon,
  SortUpIcon,
} from "../../../../DataDisplay/Icons";

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

  let tableHeadingClasses: string[] = ["table-heading"];
  if (config && config.className) tableHeadingClasses.push(config.className);

  const getNextState = (actualState: number): number => {
    let nextState = actualState;
    actualState < states.length - 1 ? (nextState += 1) : (nextState = 0);
    return nextState;
  };

  const changeHeadingSortHandler = (): void => {
    if (isSorted) {
      const newIndex = getNextState(_.indexOf(states, sortState));
      config && onSortChanged && onSortChanged(config.field, states[newIndex]);
    }
  };

  let icon = null;
  switch (_.indexOf(states, sortState)) {
    case 0:
      icon = <SortIcon />;
      break;
    case 1:
      icon = <SortDownIcon />;
      break;
    case 2:
      icon = <SortUpIcon />;
      break;
    default:
      break;
  }

  return (
    <th
      onClick={changeHeadingSortHandler}
      className={tableHeadingClasses.join(" ")}
      style={{
        cursor: isSorted ? "pointer" : "default",
        ...config?.style,
      }}
    >
      <div className={"table-heading__content"}>
        {config ? config.name : ""}
        {isSorted && (
          <div className={"table-heading__sort-wrapper"}>
            {sortIndex && <span>{`${sortIndex}`}</span>}
            {icon}
          </div>
        )}
      </div>
    </th>
  );
};

export default TableHeading;
