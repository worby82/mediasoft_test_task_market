import { InputType } from "../../app_types"

export interface IAppInput {
  type: InputType
  text?: string 
  externalClassName?: string
  placeholder?: string
  handleExternal?: any
  required?: boolean
  validate?: string
}