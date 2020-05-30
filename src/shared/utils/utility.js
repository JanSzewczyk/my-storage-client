export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const createSearchQuery = (query) => {
  let searchQuery = [];

  if (query.search && query.search !== "") {
    searchQuery.push(`search=${encodeURIComponent(query.search)}`);
  }

  if (query.sort.length > 0) {
    query.sort.map((s) => searchQuery.push(`sort=${s.field},${s.type}`));
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

const cleanLocalization = (localization) => {
  const authorized_local = ["pl", "en", "fr", "nl"];

  for (let authorized in authorized_local) {
    if (localization.includes(authorized)) {
      console.log(localization);
      return localization;
    }
  }
  return "en-US";
};

export const formatMoney = (amount, currency) => {
  const languageBrowser = navigator.language;
  const localization = cleanLocalization(languageBrowser);

  let formatter = new Intl.NumberFormat(localization, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });

  let value = formatter.format(amount);

  return `${value}`;
};
