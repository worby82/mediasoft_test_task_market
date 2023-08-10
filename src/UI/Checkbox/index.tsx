import { useState, useEffect } from "react";

import Icon from "../Icon";

import { ICheckbox } from "./interface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const checkbox = bemClassName("checkbox");

const Checkbox: React.FC<ICheckbox> = ({
  text,
  checked,
  externalClassName = "",
  handleExternal,
  iconName,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    if (handleExternal) {
      handleExternal();
    }
  };

  useEffect(() => {
    if (checked) {
      setIsChecked(checked);
    }
  }, []);
  return (
    <label className={`${checkbox()} ${externalClassName}`}>
      <input
        className={checkbox("hiden")}
        type="checkbox"
        onChange={handleChange}
      />
      <span
        className={checkbox("custom", { checked: isChecked })}
        aria-hidden="true"
      >
        {isChecked && (
          <Icon iconName="check" externalClassName={checkbox("icon")} />
        )}
      </span>
      {iconName && (
        <Icon iconName={iconName} externalClassName={checkbox("text-icon")} />
      )}
      {text}
    </label>
  );
};

export default Checkbox;