export const formatToCurrency = (val: number) => {
  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(val);

  return formattedCurrency;
};
