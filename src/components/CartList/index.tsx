import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { ICartProduct } from "../../app_interfaces";

import CartProduct from "../CartProduct";

import bemClassName from "../../utils/bem";
import "./index.scss";
import priceFormat from "../../utils/priceFormat";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";

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
          handleExternal={() => navigate("/order")}
          externalClassName={cartList("order-button")}
        />
      </div>
    </>
  ) : (
    <h3>Корзина пуста</h3>
  );
};

export default CartList;