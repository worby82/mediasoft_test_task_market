import { IConfigurableOption, IFilteredOptions, ISelectedOption } from "../../app_interfaces";

export interface IConfigurableOptionsProps {
  option: IConfigurableOption;
  handleExternal: any;
  selectedOption?: ISelectedOption;
  filteredOptions?: IFilteredOptions;
}