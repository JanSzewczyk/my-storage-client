import { useState, useCallback } from "react";
import { updateObject } from "../../shared/utils/utility";

const useQuery = (initial) => {
  const [query, setQuery] = useState(initial);

  const onSortChanged = useCallback(
    (field, type) => {
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
    (index) => {
      setQuery(
        updateObject(query, {
          page: index,
        })
      );
    },
    [query]
  );

  const onSizeChange = useCallback(
    (size) => {
      setQuery(
        updateObject(query, {
          size: size,
        })
      );
    },
    [query]
  );

  const onSearchChanged = useCallback(
    (searchString) => {
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
