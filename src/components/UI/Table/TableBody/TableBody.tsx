import React from "react";

import { FixMeLater } from "../../../../shared/types/common/FixMeLater";
import { TableConfig } from "../types";

import TableRow from "./TableRow/TableRow";

interface TableBodyProps {
  data: FixMeLater[];
  config: TableConfig;
  onRowClick?: (rowData: FixMeLater) => void;
}

const TableBody: React.FC<TableBodyProps> = ({ data, config, onRowClick }) => {
  return (
    <tbody className="table-body">
      {data.map((d: FixMeLater, index: number) => (
        <TableRow
          key={index}
          config={config}
          data={d}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
