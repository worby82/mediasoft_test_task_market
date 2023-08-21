import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

import { ICartProduct } from "../../app_interfaces";

import CartProduct from "../CartProduct";
import Button from "../../UI/Button";

import priceFormat from "../../utils/priceFormat";
import bemClassName from "../../utils/bem";
import "./index.scss";

const cartList = bemClassName("cart-list");

const CartList = () => {
  const cartProducts = useSelector(
    (state: RootState) => state.cartData.cartProducts
  );
  const subtotalCart = useSelector(
    (state: RootState) => state.cartData.cartProducts
  )
    .reduce(
      (subtotal, cartProduct) =>
        (subtotal += cartProduct.regular_price.value * cartProduct.count),
      0
    )
    .toFixed(2);
  const navigate = useNavigate();
  return cartProducts.length > 0 ? (
    <>
      <div className={cartList()}>
        {cartProducts.map((cartProduct: ICartProduct) => (
          <CartProduct cartProduct={cartProduct} key={cartProduct.id} />
        ))}
      </div>
      <div className={cartList("footer")}>
        <h2 className="subotal">Итого: {priceFormat("USD", +subtotalCart)}</h2>
        <Button
          text="Оформить заказ"
          handleExternal={() => navigate("/mediasoft_test_task_market/order")}
          externalClassName={cartList("order-button")}
        />
      </div>
    </>
  ) : (
    <h3>Корзина пуста</h3>
  );
};

export default CartList;