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
