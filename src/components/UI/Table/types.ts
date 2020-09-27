import { ReactNode } from "react";
import { FixMeLater } from "../../../shared/types/common/FixMeLater";

export declare type TableLayoutType = "auto" | "fixed";

export declare type TableConfig = {
  columns: TableColumnConfig[];
  actions?: TableActionConfig[];
};

export declare type TableColumnConfig = {
  field: string;
  name: string;
  sorted?: boolean;
  converter?: (cellData: FixMeLater, rowData: FixMeLater) => ReactNode;
};

export declare type TableActionConfig = {
  name: string;
  action: (rowData: FixMeLater) => void;
};
