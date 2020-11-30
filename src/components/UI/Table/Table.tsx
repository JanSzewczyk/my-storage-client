import React, { CSSProperties } from "react";

import { TableConfig, TableLayoutType } from "./types";
import { SortInfo, SortStateType } from "../../../hooks/useQuery";

import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Loading from "../Loading";

import "./Table.scss";

interface TableProps<TTable> {
  config: TableConfig<TTable>;
  data?: TTable[];
  loading?: boolean;
  onRowClick?: (rowData: TTable) => void;
  sort?: SortInfo[];
  onSortChanged?: (field: keyof TTable, type: SortStateType) => void;
  tableLayout?: TableLayoutType;
  fontSize?: number;
  className?: string;
  style?: CSSProperties;
}

const Table = <TTable,>({
  config,
  sort = [],
  onSortChanged,
  data = [],
  onRowClick,
  loading = false,
  tableLayout = "auto",
  fontSize = 16,
  className,
  style,
}: TableProps<TTable>) => {
  let tableClasses: string[] = ["table"];
  if (className) tableClasses.push(className);

  return (
    <Aux>
      <table
        className={tableClasses.join(" ")}
        style={{
          tableLayout: tableLayout,
          fontSize: fontSize,
          ...style,
        }}
      >
        <TableHeader<TTable>
          config={config}
          sort={sort}
          onSortChanged={onSortChanged}
        />
        {!loading && (
          <TableBody<TTable>
            config={config}
            data={data}
            onRowClick={onRowClick}
          />
        )}
      </table>
      {loading && <Loading />}
    </Aux>
  );
};

export default Table;
