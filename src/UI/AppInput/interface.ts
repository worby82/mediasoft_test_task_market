import { InputType } from "../../app_types"

export interface IAppInput {
  type: InputType
  name: string
  text?: string 
  externalClassName?: string
  placeholder?: string
  handleExternal?: any
  required?: boolean
  handleExternalRequired?: any
}