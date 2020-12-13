import _ from "lodash";

export const formatMoney = (amount: number, currency: string): string => {
  const languageBrowser = navigator.language;

  if (_.isEmpty(currency)) return `${amount}`;

  let formatter = new Intl.NumberFormat(languageBrowser, {
    style: "currency",
    currency: currency,
    maximumSignificantDigits: 2,
  });

  let value = formatter.format(amount);

  return `${value}`;
};
