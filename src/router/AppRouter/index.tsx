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
          <Route path="/mediasoft_test_task_market/" element={<Home />} />
          <Route path="/mediasoft_test_task_market/cart" element={<Cart />} />
          <Route path="/mediasoft_test_task_market/order" element={<Order />} />
        </Routes>
      </Main>
    </Container>
  );
}

export default AppRouter;