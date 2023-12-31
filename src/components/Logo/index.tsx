import { Link } from "react-router-dom";

import bemClassName from "../../utils/bem";

import logoPNG from "../../assets/images/logo.png";

import "./index.scss";

const logo = bemClassName("logo");

const Logo = () => {
  return (
    <Link className={logo()} to={"/mediasoft_test_task_market/"}>
      <img className={logo("image")} src={logoPNG} alt="Логотип" />
      <h3 className={logo("title")}>
        MEDIASOFT
        <br />
        Market
      </h3>
    </Link>
  );
};

export default Logo;