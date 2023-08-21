import { NAME, PRICE, RATING } from "../../app_constants"
import { IProductItem } from "../../app_interfaces"
import { SortedValue } from "../../app_types"

export function getSortedProducts(products: Array<IProductItem>, sortedValue: null | SortedValue): Array<IProductItem> {
  
  switch (sortedValue) {
    case NAME:
      return [...products].sort((prev, next) => prev.title.localeCompare(next.title))

    case PRICE:
      return [...products].sort((prev, next) => prev.regular_price.value - next.regular_price.value)

    case RATING:
      return [...products].sort((prev, next) => next.rating - prev.rating)

    default:
      return products
  }
}