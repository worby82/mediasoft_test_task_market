import { NAME, PRICE, RAITING } from "../../app_constants"
import { IProductItem } from "../../app_interfaces"
import { SortedValue } from "../../app_types"

export function getSortedProducts(products: Array<IProductItem>, sortedValue: null | SortedValue): Array<IProductItem> {
  
  switch (sortedValue) {
    case NAME:
      return [...products].sort((prev, next) => prev.title.localeCompare(next.title))

    case PRICE:
      return [...products].sort((prev, next) => prev.regular_price.value - next.regular_price.value)

    case RAITING:
      return [...products].sort((prev, next) => next.raiting - prev.raiting)

    default:
      return products
  }
}