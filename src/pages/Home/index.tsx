import { useEffect } from "react";

import Filter from "../../components/Filter";
import ProductList from "../../components/ProductList";
import Sorting from "../../components/Sorting";

import bemClassName from "../../utils/bem";

import "./index.scss";

const home = bemClassName("home");

const Home = () => {
  useEffect(() => {
    document.title = "Mediasoft Market";
  }, []);

  return (
    <div className={home()}>
      <Filter/>
      <div className={home('right-content')}>
        <Sorting />
        <ProductList />
      </div>
    </div>
  );
};

export default Home;