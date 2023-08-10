import { useState, useEffect } from "react";

import { IRadioButtons } from "./interface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const radioButtons = bemClassName("radio-buttons");

const RadioButtons: React.FC<IRadioButtons> = ({
  data,
  externalClassName = "",
  handleExternal,
  name,
  title,
}) => {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setValue(value);
    if (handleExternal) {
      handleExternal(value);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className={`${radioButtons()} ${externalClassName}`}>
      <p className={radioButtons("title")}>{title}</p>
      {data.map((item, id) => {
        return (
          <label className={radioButtons("label")} key={id}>
            <input
              className={radioButtons("hiden")}
              type="radio"
              name={name}
              onChange={() => handleChange(item.value)}
            />
            <span
              className={radioButtons("custom", {
                checked: value === item.value,
              })}
              aria-hidden="true"
            ></span>
            {item.text}
          </label>
        );
      })}
    </div>
  );
};

export default RadioButtons;