import React from "react";

import { FixMeLater } from "../../../shared/types/common/FixMeLater";
import { TableConfig, TableLayoutType } from "./types";
import { SortInfo, SortType } from "../../../hooks/useQuery";

import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Loading from "../Loading";

import "./Table.scss";

interface TableProps {
  config: TableConfig;
  data?: FixMeLater[];

  onRowClick?: (rowData: FixMeLater) => void;

  sort?: SortInfo[];
  onSortChanged?: (field: string, type: SortType) => void;

  loading?: boolean;
  tableLayout?: TableLayoutType;
  fontSize?: number;
  tableClass?: string;
}

const Table: React.FC<TableProps> = React.memo(
  ({
    config,
    sort = [],
    onSortChanged,
    data = [],
    onRowClick,
    loading = false,
    tableLayout = "auto",
    fontSize = 16,
    tableClass,
  }) => {
    return (
      <Aux>
        <table
          className={"table"}
          style={{
            tableLayout: tableLayout,
            fontSize: fontSize,
          }}
        >
          <TableHeader
            config={config}
            sort={sort}
            onSortChanged={onSortChanged}
          />
          {!loading && (
            <TableBody config={config} data={data} onRowClick={onRowClick} />
          )}
        </table>
        {loading && <Loading />}
      </Aux>
    );
  }
);

export default Table;
