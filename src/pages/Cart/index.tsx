import { useEffect } from "react";

import Container from "../../UI/Container";

import bemClassName from "../../utils/bem";

import "./index.scss";

const cart = bemClassName("cart");

const Cart = () => {
  useEffect(() => {
    document.title = "Cart | Mediasoft Market";
  }, []);

  return (
    <>
    </>
  );
};

export default Cart;