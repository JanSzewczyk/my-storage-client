import { CSSProperties, ReactNode } from "react";
import { FixMeLater } from "../../../../shared/types/common/FixMeLater";

export declare type TableLayoutType = "auto" | "fixed";

export declare type TableConfig<T> = {
  columns: TableColumnConfig<T>[];
  actions?: TableActionConfig<T>[];
  setRowStyle?: (rowData: T) => CSSProperties;
};

export declare type TableColumnConfig<T> = {
  field: keyof T;
  converter?: (cellData: FixMeLater, rowData: T) => ReactNode;
  name: string;
  sorted?: boolean;
  clickable?: boolean;
  style?: CSSProperties;
  setCellStyle?: (cellData: any, rowData: T) => CSSProperties;
  className?: string;
};

export declare type TableActionConfig<T> = {
  name: string;
  action: (rowData: T) => void;
};
