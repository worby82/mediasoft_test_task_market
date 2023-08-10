import { useEffect, useRef, useState } from "react";

import { IRangeSlider } from "./interface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const rangeSlider = bemClassName("range-slider");

const RangeSlider: React.FC<IRangeSlider> = ({
  minValue = 0,
  maxValue = 10000,
  step = 1,
  from,
  to,
  externalClassName = "",
  title,
}) => {
  const [fromValue, setFromValue] = useState<number | null>(null);
  const [toValue, setToValue] = useState<number | null>(null);

  const range = useRef<HTMLInputElement>(null);

  const handleChangeFromValue = (value: string) => {
    value = value.replace(/[^\d]/g, "");
    const currentValue = +value;
    if (currentValue >= minValue) {
      if (toValue && currentValue >= toValue) {
        setFromValue(toValue);
      } else if (toValue) {
        setFromValue(currentValue);
      } else {
        setFromValue(minValue);
      }
    }
  };

  const handleChangeToValue = (value: string) => {
    value = value.replace(/[^\d]/g, "");
    const currentValue = +value;
    if (currentValue <= maxValue) {
      if (fromValue && currentValue <= fromValue) {
        setToValue(fromValue);
      } else {
        setToValue(currentValue);
      }
    } else {
      setToValue(maxValue);
    }
  };

  useEffect(() => {
    if (fromValue !== null) {
      range.current!.style.left = (fromValue / maxValue) * 100 + "%";
    }
    if (toValue !== null) {
      range.current!.style.right = 100 - (toValue / maxValue) * 100 + "%";
    }
  }, [toValue, fromValue]);

  useEffect(() => {
    setFromValue(minValue);
    setToValue(maxValue);
    range.current!.style.left = (minValue / maxValue) * 100 + "%";
    range.current!.style.right = 100 - (maxValue / maxValue) * 100 + "%";
  }, []);

  return (
    <div className={`${rangeSlider()} ${externalClassName}`}>
      {title && <p className={rangeSlider("title")}>{title}</p>}
      <div className={rangeSlider("field-wrapper")}>
        <div className={rangeSlider("input-wrapper")}>
          <div className={rangeSlider("field")}>
            {from && (
              <span className={rangeSlider("field-placeholder")}>{from}</span>
            )}
            <input
              type="number"
              className={rangeSlider("input")}
              value={fromValue + ""}
              onInput={(event) =>
                handleChangeFromValue((event.target as HTMLInputElement).value)
              }
              min={minValue}
              max={toValue ? toValue : maxValue}
              step={step}
              pattern="[0-9]"
            />
            {!from && !to && (
              <span className={rangeSlider("field-placeholder")}>₽</span>
            )}
          </div>
          <div className={rangeSlider("separator")}></div>
          <div className={rangeSlider("field")}>
            {to && (
              <span className={rangeSlider("field-placeholder")}>{to}</span>
            )}
            <input
              type="number"
              className={rangeSlider("input")}
              value={toValue + ""}
              onInput={(event) =>
                handleChangeToValue((event.target as HTMLInputElement).value)
              }
              min={fromValue ? fromValue : minValue}
              max={maxValue}
              step={step}
            />
            {!from && !to && (
              <span className={rangeSlider("field-placeholder")}>₽</span>
            )}
          </div>
        </div>
        <div className={rangeSlider("slider")}>
          <div className={rangeSlider("slider-back")}></div>
          <div className={rangeSlider("progress-wrap")}>
            <div className={rangeSlider("progress")} ref={range}></div>
          </div>
          <div className={rangeSlider("range-wrapper")}>
            <input
              type="range"
              className={rangeSlider("range", { left: true })}
              min={minValue}
              max={maxValue}
              value={fromValue !== null ? fromValue : 0}
              step={step}
              onChange={(event) => handleChangeFromValue(event.target.value)}
            />
            <input
              type="range"
              className={rangeSlider("range", { right: true })}
              min={minValue}
              max={maxValue}
              value={toValue !== null ? toValue : 0}
              step={step}
              onChange={(event) => handleChangeToValue(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;