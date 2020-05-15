export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const createSearchQuery = (query) => {
  let searchQuery = [];

  if (query.search !== "") {
    searchQuery.push(`search=${encodeURIComponent(query.search)}`);
  }
  
  if (query.sort.length > 0) {
    query.sort.map((s) => searchQuery.push(`sort=${s.field},${s.type}`));
  }

  if (query.states && query.states.length > 0) {
    searchQuery.push(`states=${query.states.join(",")}`);
  }
  searchQuery.push(`page=${query.page}`);

  if (query.role && query.role !== "") {
    searchQuery.push(`role=${query.role}`);
  }

  return searchQuery.length > 0 ? `?${searchQuery.join("&")}` : "";
};
