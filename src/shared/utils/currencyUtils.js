import _ from "lodash";

const cleanLocalization = (localization) => {
  // TODO add polish language
  const authorized_local = ["en", "fr", "nl"];

  for (let authorized of authorized_local) {
    if (_.includes(localization, authorized)) {
      return localization;
    }
  }

  return "en-US";
};

export const formatMoney = (amount, currency = "") => {
  const languageBrowser = navigator.language;
  const localization = cleanLocalization(languageBrowser);

  if (currency === "") return amount;

  let formatter = new Intl.NumberFormat(localization, {
    style: "currency",
    currency: currency,
    fractionDigits: 2,
  });

  let value = formatter.format(amount);

  return `${value}`;
};
