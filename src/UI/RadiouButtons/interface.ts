export interface IRadioButtonsData {
  text: string
  value: string
}
export interface IRadioButtons {
  data: Array<IRadioButtonsData>
  externalClassName?: string
  handleExternal?: any
  name: string
  title?: string
}