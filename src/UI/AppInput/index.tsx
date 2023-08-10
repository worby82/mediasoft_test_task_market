import { useEffect, useRef, useState } from "react";

import { TEL, TEXT } from "../../app_constants";
import { IAppInput } from "./interface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const appInput = bemClassName("app-input");

const AppInput: React.FC<IAppInput> = ({
  type,
  text,
  externalClassName = "",
  placeholder = "",
  handleExternal,
  required,
  validate,
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  const input = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (type === TEL) {
      if (input.current !== null) {
        if (
          input.current.value.replace(/\s/g, "").length >= 0 &&
          input.current.value.replace(/\s/g, "").length < 2
        ) {
          setValue("+7");
        } else if (input.current.value.replace(/\s/g, "").length <= 12) {
          let value = input.current.value
            .replace(/\s/g, "")
            .replace(/[^0-9+]/, "")
            .slice(2);
          value = `+7 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(
            6,
            8
          )} ${value.slice(8, 10)}`;
          setValue(value.trim());
          if (input.current.value.replace(/\s/g, "").length < 12) {
            setInvalid(true);
          } else {
            setInvalid(false);
          }
        }
      }
    } else {
      setValue(input.current!.value);
    }
    if (value?.length === 0) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  };

  const handleBlur = () => {
    if (validate) {
      if (type === TEL) {
        if (value && value.replace(/\s/g, "").length < 12) {
          setInvalid(true);
        } else {
          setInvalid(false);
        }
      }
    }
    if (required) {
      if (type === TEXT) {
        if (value?.length === 0) {
          setInvalid(true);
        } else {
          setInvalid(false);
        }
      }
      if (type === TEL) {
        if (value && value.replace(/\s/g, "").length < 12) {
          setInvalid(true);
        } else {
          setInvalid(false);
        }
      }
    }
  };

  useEffect(() => {
    if (handleExternal) {
      if (type === TEL) {
        handleExternal(value?.replace(/\s/g, ""));
      } else {
        handleExternal(value);
      }
    }
  }, [value]);

  useEffect(() => {
    if (type === TEL) {
      setValue("+7");
    }
  }, []);
  return (
    <label className={`${appInput()} ${externalClassName}`}>
      <p className={appInput("text")}>{text}</p>
      <input
        ref={input}
        onChange={handleChange}
        onBlur={handleBlur}
        className={appInput("field", { error: invalid })}
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        required={required}
      />
      {invalid && validate && <p className={appInput("error")}>{validate}</p>}
      {required && invalid && (
        <p className={appInput("error")}>Обязательное поле</p>
      )}
    </label>
  );
};

export default AppInput;