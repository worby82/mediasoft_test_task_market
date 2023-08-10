import bemClassName from "../../utils/bem";

import "./index.scss";

const container = bemClassName("container");

const Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={container()}>{children}</div>;
};

export default Container;