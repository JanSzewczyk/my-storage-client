import { useState, useCallback } from "react";
import { updateObject } from "../../../../shared/utils/utility";

const useQuery = (initial) => {
  const [query, setQuery] = useState(initial);

  const onSortChanged = useCallback(
    (sort) => {
      setQuery(
        updateObject(query, {
          sort: sort,
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

  return { query, setQuery, onSortChanged, onPageChanged, onSizeChange };
};

export default useQuery;
