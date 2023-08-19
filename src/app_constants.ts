import { AttributeCode, CreditCardTypes, ProductItemType, SortedValue } from "./app_types";

export const TEL = 'tel'
export const TEXT = 'text'
export const EMAIL = 'email'
export const PASSWORD = 'password'


export const CONFIGURABLE: ProductItemType = "configurable"
export const SIMPLE: ProductItemType = "simple"

export const COLOR: AttributeCode = "color"
export const SIZE: AttributeCode = "size"

export const NAME: SortedValue = "name"
export const PRICE: SortedValue = "price"
export const RAITING: SortedValue = "raiting"

export const mountArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
export const yearArray = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034"]

export const CARDNUMBER: CreditCardTypes = 'card-number'
export const CARDHOLDER: CreditCardTypes = 'card-holder'
export const CARDMONTH: CreditCardTypes = 'card-month'
export const CARDYEAR: CreditCardTypes = 'card-year'
export const CARDCVV: CreditCardTypes = 'card-cvv'