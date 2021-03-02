import React from "react";
import { SortInfo, SortStateType } from "../../../../../hooks/useQuery";

import { TableColumnConfig, TableConfig } from "../types";

import TableHeading from "./TableHeading/TableHeading";
import TableSelectHeading from "./TableSelectHeading/TableSelectHeading";

interface TableHeaderProps<TTable> {
  config: TableConfig<TTable>;
  sort: SortInfo[];
  onSortChanged?: (field: keyof TTable, type: SortStateType) => void;
  selectable: boolean;
  // singleSelect: boolean;
  selected: TTable[];
  data: TTable[];
  onSelectHeadingClick: () => void;
}

const TableHeader = <TTable,>({
  config,
  sort,
  onSortChanged,
  selectable,
  // singleSelect,
  selected,
  data,
  onSelectHeadingClick,
}: TableHeaderProps<TTable>) => {
  const getSortIndex = (fieldName: keyof TTable): number | null => {
    if (sort.length > 1) {
      for (let i = 0; i < sort.length; i++) {
        if (fieldName === sort[i].field) {
          return i + 1;
        }
      }
    }
    return null;
  };

  const getSortState = (fieldName: keyof TTable): SortStateType => {
    for (let i = 0; i < sort.length; i++) {
      if (fieldName === sort[i].field) {
        return sort[i].type;
      }
    }

    return "";
  };

  return (
    <thead>
      <tr>
        {selectable && (
          <TableSelectHeading
            // singleSelect={singleSelect}
            selected={selected}
            data={data}
            onSelectHeadingClick={onSelectHeadingClick}
          />
        )}
        {config.columns.map(
          (conf: TableColumnConfig<TTable>, index: number) => (
            <TableHeading<TTable>
              key={index}
              config={conf}
              isSorted={Boolean(onSortChanged) && conf.sorted === true}
              onSortChanged={onSortChanged && onSortChanged}
              sortIndex={getSortIndex(conf.field)}
              sortState={getSortState(conf.field)}
            />
          )
        )}
        {config.actions && (
          <TableHeading<TTable>
            key={"actions"}
            isSorted={false}
            sortState={""}
          />
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
