export const formatAmountForStripe = (amount, currency) => {
  let numberFormat = new Intl.NumberFormat(["no-NO"], {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });

  const parts = numberFormat.formatToParts(amount);

  //   [
  //   { type: "integer", value: "1" },
  //   { type: "group", value: " " },
  //   { type: "integer", value: "234" },
  //   { type: "decimal", value: "," },
  //   { type: "fraction", value: "56" },
  //   { type: "literal", value: " " },
  //   { type: "currency", value: "kr" }
  // ]

  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }

  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
};
