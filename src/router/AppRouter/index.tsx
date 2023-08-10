import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setWindowWidth } from '../../store/reducers/window/windowSlice';

import Header from '../../components/Header';
import Main from '../../components/Main';
import Container from '../../UI/Container';

import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import Order from '../../pages/Order';

import './index.scss';

function AppRouter() {
  const dispatch = useDispatch()

  useEffect(() => {
    function handleWindowResize() {
      dispatch(setWindowWidth(window.innerWidth))
    }
    
    dispatch(setWindowWidth(window.innerWidth))
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    // eslint-disable-next-line
  }, []);

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