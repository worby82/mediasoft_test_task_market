import { useEffect } from "react";

import CartList from "../../components/CartList";

import bemClassName from "../../utils/bem";

import "./index.scss";

const cart = bemClassName("cart");

const Cart = () => {
  useEffect(() => {
    document.title = "Корзина | MEDIASOFT Market";
  }, []);

  return (
    <div className={cart()}>
      <h1>Корзина</h1>
      <CartList />
    </div>
  );
};

export default Cart;