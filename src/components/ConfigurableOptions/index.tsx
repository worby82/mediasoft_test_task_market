import { COLOR } from "../../app_constants";
import { IConfigurableValue } from "../../app_interfaces";
import { IConfigurableOptionsProps } from "./interface";

import bemClassName from "../../utils/bem";

import "./index.scss";

const configurablOptions = bemClassName("configurable-options");

const ConfigurableOptions: React.FC<IConfigurableOptionsProps> = ({
  option,
  handleExternal,
  selectedOption,
  filteredOptions,
}) => {
  const handleClickValue = (id: number) => {
    if (selectedOption === undefined || selectedOption?.value_index !== id) {
      handleExternal({ code: option.attribute_code, value_index: id });
    } else {
      handleExternal({ code: option.attribute_code, value_index: null });
    }
  };
  return (
    <div className={configurablOptions()}>
      {option.values.map((value: IConfigurableValue) => {
        return option.attribute_code === COLOR ? (
          <div
            className={configurablOptions("item", {
              active:
                selectedOption &&
                value.value_index === selectedOption.value_index,
              disable:
                filteredOptions &&
                !filteredOptions.valueIndexes.includes(value.value_index),
            })}
            key={value.value_index}
            style={{ backgroundColor: value.value }}
            onClick={() =>
              filteredOptions
                ? filteredOptions.valueIndexes.includes(value.value_index) &&
                  handleClickValue(value.value_index)
                : handleClickValue(value.value_index)
            }
          ></div>
        ) : (
          <div
            className={configurablOptions("item", {
              active:
                selectedOption &&
                value.value_index === selectedOption.value_index,
              disable:
                filteredOptions &&
                !filteredOptions.valueIndexes.includes(value.value_index),
            })}
            key={value.value_index}
            onClick={() =>
              filteredOptions
                ? filteredOptions.valueIndexes.includes(value.value_index) &&
                  handleClickValue(value.value_index)
                : handleClickValue(value.value_index)
            }
          >
            {value.label}
          </div>
        );
      })}
    </div>
  );
};

export default ConfigurableOptions;
