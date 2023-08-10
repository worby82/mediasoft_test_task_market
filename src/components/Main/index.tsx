import bemClassName from "../../utils/bem";

import "./index.scss";

const main = bemClassName("main");

const Main = (props: React.PropsWithChildren) => {
  return <main className={main()}>{props.children}</main>;
};

export default Main;