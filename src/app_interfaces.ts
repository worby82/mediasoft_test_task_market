import { AttributeCode, ProductItemType } from "./app_types"

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
  raiting: number
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

export interface ISelectedOption {
  code: string;
  value_index: number | null;
}

export interface IFilteredOptions {
  code: string;
  valueIndexes: Array<Number>;
}

export interface ICartAtribute {
  code_label: string
  value_label: string
}

export interface ICartProduct {
  id: number
  image: string
  title: string
  regular_price: IRegularPrice
  attributes?: Array<ICartAtribute>
  count: number
  brand: string
}

export interface ICartProductCount {
  id: number
  count: number
}

export interface IRequired {
  name: string;
  valid: boolean;
}