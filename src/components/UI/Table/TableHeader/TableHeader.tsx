import React from "react";

import { TableColumnConfig, TableConfig } from "../types";
import { SortInfo, SortStateType } from "../../../../hooks/useQuery";

import TableHeading from "./TableHeading/TableHeading";

interface TableHeaderProps<TTable> {
  config: TableConfig<TTable>;
  sort: SortInfo[];
  onSortChanged?: (field: keyof TTable, type: SortStateType) => void;
}

const TableHeader = <TTable,>({
  config,
  sort,
  onSortChanged,
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
        {config.columns.map(
          (conf: TableColumnConfig<TTable>, index: number) => (
            <TableHeading<TTable>
              key={index}
              config={conf}
              isSorted={Boolean(onSortChanged) && conf.sorted === true} // TODO check this
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
