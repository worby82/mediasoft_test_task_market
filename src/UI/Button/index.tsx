import { IButton } from "./Inteface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const button = bemClassName("button");

const Button: React.FC<IButton> = ({
  text,
  handleExternal,
  externalClassName = "",
  disabled
}) => {
  const handleClick = () => {
    if (handleExternal) {
      handleExternal();
    }
  };

  return (
    <button
      className={`${button({disabled})} ${externalClassName}`}
      type="button"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;