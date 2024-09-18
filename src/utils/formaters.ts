export const currencyFormater = (number: number) => {
  const options = {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 4,
  };

  return new Intl.NumberFormat("en-US", options).format(number);
};
