import { useState, useEffect } from "react";

import Icon from "../Icon";

import { ICounter } from "./interface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const counter = bemClassName("counter");

const Counter: React.FC<ICounter> = ({
  value,
  handleExternal,
  minValue = 0,
  maxValue,
  text,
  note,
}) => {
  const [count, setCount] = useState(0);

  const handleClickIncrement = () => {
    if (maxValue) {
      if (count < maxValue) {
        setCount((prevState) => ++prevState);
      }
    } else {
      setCount((prevState) => ++prevState);
    }
  };
  const handleClickDecrement = () => {
    if (count > minValue) {
      setCount((prevState) => --prevState);
    }
  };

  useEffect(() => {
    if (handleExternal) {
      handleExternal(count);
    }
  }, [count]);

  useEffect(() => {
    setCount(value);
  }, []);

  return (
    <div className={counter()}>
      <p className={counter("text")}>
        {text}
        {note && <span className={counter("note")}>{note}</span>}
      </p>
      <div className={counter("field")}>
        <span
          onClick={handleClickDecrement}
          className={counter("button", { disable: count === minValue })}
        >
          <Icon iconName="minus" externalClassName={counter("icon")} />
        </span>
        {count}
        <span
          onClick={handleClickIncrement}
          className={counter("button", { disable: !!(count === maxValue) })}
        >
          <Icon iconName="plus" externalClassName={counter("icon")} />
        </span>
      </div>
    </div>
  );
};

export default Counter;