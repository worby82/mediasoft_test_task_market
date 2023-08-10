import { IIcon } from "./interface";
import bemClassName from "../../utils/bem";

import icons from "../../assets/svg/sprite.svg";

import "./index.scss";

const icon = bemClassName("icon");

const Icon: React.FC<IIcon> = ({
  externalClassName = "",
  stroke,
  iconName,
  handleClick,
}) => {
  return (
    <svg
      className={`${icon({
        stroke,
      })} ${externalClassName}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={handleClick}
    >
      <use xlinkHref={`${icons}#${iconName}`}></use>
    </svg>
  );
};

export default Icon;