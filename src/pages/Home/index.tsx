import { useEffect } from "react";

import Container from "../../UI/Container";

import bemClassName from "../../utils/bem";

import "./index.scss";
import Filter from "../../components/Filter";
import ProductList from "../../components/ProductList";

const home = bemClassName("home");

const Home = () => {
  useEffect(() => {
    document.title = "Mediasoft Market";
  }, []);

  return (
    <div className={home()}>
      <Filter/>
      <ProductList />
    </div>
  );
};

export default Home;