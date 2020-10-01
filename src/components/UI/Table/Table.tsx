import React from "react";

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

  onRowClick?: (rowData: TTable) => void;

  sort?: SortInfo[];
  onSortChanged?: (field: keyof TTable, type: SortStateType) => void;

  loading?: boolean;
  tableLayout?: TableLayoutType;
  fontSize?: number;
  tableClass?: string;
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
  tableClass,
}: TableProps<TTable>) => {
  return (
    <Aux>
      <table
        className={"table"}
        style={{
          tableLayout: tableLayout,
          fontSize: fontSize,
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
