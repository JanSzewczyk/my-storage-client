import { useState, useCallback } from "react";
import { updateObject } from "../../shared/utils/utility";
import { Query, SortType, UseQueryMethods } from "./types";

const useQuery = <TQuery extends Query>(
  initialQuery: TQuery
): UseQueryMethods<TQuery> => {
  const [query, setQuery] = useState<TQuery>(initialQuery);

  const onSortChanged = useCallback(
    (field: string, type: SortType) => {
      let sortData = query.sort;

      sortData = sortData.filter((s) => s.field !== field);
      if (type !== "") {
        sortData.push({ field, type });
      }

      setQuery(
        updateObject(query, {
          sort: sortData,
        })
      );
    },
    [query]
  );

  const onPageChanged = useCallback(
    (index: number) => {
      setQuery(
        updateObject(query, {
          page: index,
        })
      );
    },
    [query]
  );

  const onSizeChange = useCallback(
    (size: number) => {
      setQuery(
        updateObject(query, {
          size: size,
        })
      );
    },
    [query]
  );

  const onSearchChanged = useCallback(
    (searchString: string) => {
      setQuery(
        updateObject(query, {
          search: searchString,
        })
      );
    },
    [query]
  );

  return {
    query,
    setQuery,
    onSortChanged,
    onPageChanged,
    onSizeChange,
    onSearchChanged,
  };
};

export default useQuery;
