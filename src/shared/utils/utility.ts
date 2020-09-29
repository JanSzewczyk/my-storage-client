export const updateObject = (oldObject: any, updatedProperties: any): any => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const createSearchQuery = (query: any): string => {
  let searchQuery = [];

  if (query.search && query.search !== "") {
    searchQuery.push(`search=${encodeURIComponent(query.search)}`);
  }

  if (query.sort && query.sort.length > 0) {
    query.sort.map((s: any) => searchQuery.push(`sort=${s.field},${s.type}`));
  }

  if (query.states && query.states.length > 0) {
    searchQuery.push(`states=${query.states.join(",")}`);
  }

  searchQuery.push(`page=${query.page}`);

  if (query.size) {
    searchQuery.push(`size=${query.size}`);
  }

  if (query.role && query.role !== "") {
    searchQuery.push(`role=${query.role}`);
  }

  return searchQuery.length > 0 ? `?${searchQuery.join("&")}` : "";
};
