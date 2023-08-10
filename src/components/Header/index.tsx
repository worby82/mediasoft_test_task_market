import { Link } from "react-router-dom";

import Logo from "../Logo";

import bemClassName from "../../utils/bem";
import cartImage from "../../assets/images/shopping-cart.png";
import "./index.scss";

const header = bemClassName("header");

const Header = () => {
  const totalCartCount = 0
  return (
    <header className={header()}>
      <Logo/>
      <Link className={header('link')} to={"/cart"}>
        <img className={header('image')} src={cartImage} alt="" />
        <div className={header('cart-count')}>{ totalCartCount }</div>
      </Link>
    </header>
  );
};

export default Header;