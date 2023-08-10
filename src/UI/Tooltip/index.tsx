import { ITooltip } from "./interface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const tooltip = bemClassName("tooltip");

const Tooltip: React.FC<ITooltip> = ({ children, text }) => {
  return (
    <div className={tooltip()}>
      {text !== "" && <p className={tooltip("text")}>{text}</p>}
      {children}
    </div>
  );
};

export default Tooltip;