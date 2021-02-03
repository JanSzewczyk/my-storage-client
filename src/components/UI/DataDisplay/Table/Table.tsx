import React, { CSSProperties, useEffect, useState } from "react";
import _ from "lodash";

import { TableConfig, TableLayoutType } from "./types";

import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";

import "./Table.scss";
import Loading from "../../Loading";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import { SortInfo, SortStateType } from "../../../../hooks/useQuery";

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
  selectable?: boolean;
  selectionChanged?: (selections: TTable[]) => void;
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
  selectable = false,
  selectionChanged,
}: TableProps<TTable>) => {
  let tableClasses: string[] = ["table"];
  if (className) tableClasses.push(className);

  const [selected, setSelected] = useState<TTable[]>([]);

  const onSelectCellClick = (selectedObject: TTable) => {
    if (Boolean(_.find(selected, (o) => _.isEqual(o, selectedObject)))) {
      setSelected((prev) =>
        _.filter(prev, (o) => !_.isEqual(o, selectedObject))
      );
    } else {
      setSelected((prev) => [...prev, selectedObject]);
    }
  };

  const onSelectHeadingClick = () => {
    if (_.differenceWith(data, selected, _.isEqual).length < data.length) {
      setSelected(_.differenceWith(selected, data, _.isEqual));
    } else {
      setSelected((prev) => [...prev, ...data]);
    }
  };

  useEffect(() => {
    if (selectionChanged) selectionChanged(selected);
  }, [selected, selectionChanged]);

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
            selectable={selectable}
            selected={selected}
            onSelectCellClick={onSelectCellClick}
          />
        )}
      </table>
      {loading && <Loading />}
    </Aux>
  );
};

export default Table;
