export const currencyFormater = (number: number) => {
  const options = {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  };

  return new Intl.NumberFormat("en-US", options).format(number);
};
