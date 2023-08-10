import { AttributeCode, ProductItemType } from "./app_types"

export interface ILike {
  id: number
}



export interface ICartItem {
  id: number
  count: number
}
export interface IProductItem {
  type: ProductItemType
  id: number
  sku: string
  title: string
  regular_price: IRegularPrice
  image: string
  configurable_options?: Array<IConfigurableOption>
  variants?: Array<IVariant>
  brand: number
}
export interface IRegularPrice {
  currency: string
  value: number
}
export interface IConfigurableOption {
  attribute_id: number
  attribute_code: AttributeCode
  label: string
  values: Array<IConfigurableValue>
}
export interface IConfigurableValue {
  label: string
  value_index: number
  value: string
}
export interface IVariant {
  attributes: Array<IVariantAttribute>
  product: IVariantProduct
}
export interface IVariantAttribute {
  code: AttributeCode
  value_index: number
}
export interface IVariantProduct {
  id: number
  sku: string
  image: string
}
export interface IBrand {
  id: number,
  title: string,
  sort: string,
  code: string
}

