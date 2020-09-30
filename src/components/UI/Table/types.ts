import { ReactNode } from "react";

export declare type TableLayoutType = "auto" | "fixed";

export declare type TableConfig<T> = {
  columns: TableColumnConfig<T>[];
  actions?: TableActionConfig<T>[];
};

export declare type TableColumnConfig<T> = {
  field: keyof T;
  name: string;
  sorted?: boolean;
  converter?: (cellData: T[keyof T], rowData: T) => ReactNode;
};

export declare type TableActionConfig<T> = {
  name: string;
  action: (rowData: T) => void;
};
