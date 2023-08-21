import { useEffect } from "react";

import StepTabs from "../../components/StepTabs";

import bemClassName from "../../utils/bem";

import "./index.scss";

export interface IRequired {
  name: string;
  valid: boolean;
}
const order = bemClassName("order");

const Order = () => {
  useEffect(() => {
    document.title = "Оформление заказа | MEDIASOFT Market";
  }, []);

  return (
    <div className={order()}>
      <StepTabs />
    </div>
  );
};

export default Order;