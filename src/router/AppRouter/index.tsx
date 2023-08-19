import { Route, Routes } from "react-router-dom";

import Header from "../../components/Header";
import Main from "../../components/Main";
import Container from "../../UI/Container";

import Home from "../../pages/Home";
import Cart from "../../pages/Cart";
import Order from "../../pages/Order";

import "./index.scss";

function AppRouter() {
  return (
    <Container>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Main>
    </Container>
  );
}

export default AppRouter;