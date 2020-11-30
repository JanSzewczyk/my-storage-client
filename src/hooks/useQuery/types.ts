import { Dispatch, SetStateAction } from "react";

export declare type SortInfo = {
  field: string;
  type: SortType;
};

export declare type SortType = "desc" | "asc";

export declare type SortStateType = SortType | "";

export declare type Query = {
  sort: SortInfo[];
  page: number;
  size: number;
};

export type SearchQuery = Query & {
  search: string;
};

export declare type UseQueryMethods<TQuery extends Query = Query> = {
  query: TQuery;
  setQuery: Dispatch<SetStateAction<TQuery>>;
  onSortChanged: (field: string, type: SortType | "") => void;
  onPageChanged: (index: number) => void;
  onSizeChange: (size: number) => void;
  onSearchChanged: (searchString: string) => void;
};
