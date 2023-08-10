import { useEffect } from "react";

import Container from "../../UI/Container";

import bemClassName from "../../utils/bem";

import "./index.scss";

const order = bemClassName("order");

const Order = () => {
  useEffect(() => {
    document.title = "Order | Mediasoft Market";
  }, []);

  return (
    <>
    </>
  );
};

export default Order;