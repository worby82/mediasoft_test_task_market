const priceFormat = (curency: string, value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: `${curency}`, currencyDisplay: 'narrowSymbol' }).format(value)
}
export default priceFormat