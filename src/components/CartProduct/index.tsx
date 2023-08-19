import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteCartProduct,
  setCartProductCount,
} from "../../store/reducers/data/cartDataSlice";

import { ICartProductProps } from "./interface";

import bemClassName from "../../utils/bem";
import priceFormat from "../../utils/priceFormat";

import trash from "../../assets/images/trash.png";
import "./index.scss";

const cartProductItem = bemClassName("cart-product");

const CartProduct: React.FC<ICartProductProps> = ({ cartProduct }) => {
  const [countValue, setCountValue] = useState<number>(1);
  const dispatch = useDispatch();

  const handleChangeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(+event.target.value !== 0) {
      setCountValue(+event.target.value.replace(/\s/g, ""));
    } else {
      event.preventDefault()
    }
  };
  useEffect(() => {
    dispatch(
      setCartProductCount({
        id: cartProduct.id,
        count: countValue,
      })
    );
    // eslint-disable-next-line
  }, [countValue]);
  return (
    <div className={cartProductItem()}>
      <img
        className={cartProductItem("image")}
        src={cartProduct.image}
        alt={cartProduct.title}
      />
      <div className={cartProductItem("title")}>
        <h3>
          {cartProduct.brand} / {cartProduct.title}
        </h3>
        {cartProduct.attributes &&
          cartProduct.attributes.map((atribute) => {
            return (
              <p>
                {atribute.code_label}: {atribute.value_label}
              </p>
            );
          })}
      </div>
      <p>
        {priceFormat(
          cartProduct.regular_price.currency,
          cartProduct.regular_price.value
        )}
      </p>

      <input
        className={cartProductItem("quantity")}
        type="number"
        min="1"
        value={cartProduct.count}
        onChange={(event) => handleChangeCount(event)}
      />

      <p>
        {priceFormat(
          cartProduct.regular_price.currency,
          cartProduct.regular_price.value * cartProduct.count
        )}
      </p>

      <img
        className={cartProductItem("image", { btn: true })}
        src={trash}
        alt="Удалить"
        onClick={() => dispatch(deleteCartProduct(cartProduct.id))}
      />
    </div>
  );
};

export default CartProduct;