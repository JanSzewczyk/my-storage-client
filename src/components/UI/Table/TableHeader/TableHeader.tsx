import React from "react";

import { TableColumnConfig, TableConfig } from "../types";
import { SortInfo, SortType } from "../../../../hooks/useQuery";

import TableHeading from "./TableHeading/TableHeading";

interface TableHeaderProps {
  config: TableConfig;
  sort: SortInfo[];
  onSortChanged?: (field: string, type: SortType) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  config,
  sort,
  onSortChanged,
}) => {
  const getSortIndex = (fieldName: string): number | null => {
    if (sort.length > 1) {
      for (let i = 0; i < sort.length; i++) {
        if (fieldName === sort[i].field) {
          return i + 1;
        }
      }
    }
    return null;
  };

  const getSortState = (fieldName: string): SortType => {
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
        {config.columns.map((conf: TableColumnConfig, index: number) => (
          <TableHeading
            key={index}
            config={conf}
            isSorted={Boolean(onSortChanged) && Boolean(conf.sorted)}
            onSortChanged={onSortChanged && onSortChanged}
            sortIndex={getSortIndex(conf.field)}
            sortState={getSortState(conf.field)}
          />
        ))}
        {config.actions && (
          <TableHeading
            key={"actions"}
            isSorted={false}
            sortState={""}
            config={{ name: "", field: "actions" }}
          />
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
