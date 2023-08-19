import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";

import Logo from "../Logo";

import bemClassName from "../../utils/bem";

import cartImage from "../../assets/images/shopping-cart.png";
import "./index.scss";

const header = bemClassName("header");

const Header = () => {
  const cartProducts = useSelector(
    (state: RootState) => state.cartData.cartProducts
  );
  const [totalCartCount, setTotalCartCount] = useState(0);

  useEffect(() => {
    setTotalCartCount(
      cartProducts.length > 0
        ? cartProducts.reduce((acc, item) => acc + item.count, 0)
        : 0
    );
  }, [cartProducts]);
  return (
    <header className={header()}>
      <Logo />
      <Link className={header("link")} to={"/cart"}>
        <img className={header("image")} src={cartImage} alt="" />
        <div className={header("cart-count")}>{totalCartCount}</div>
      </Link>
    </header>
  );
};

export default Header;