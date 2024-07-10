import { Header } from './modules/Header/Header';
import { Hero } from './modules/Hero/Hero';
import { Filter } from './modules/Filter/Filter';
import { Goods } from './modules/Goods/Goods';
import { Subscribe } from './modules/Subscribe/Subscribe';
import { Order } from './modules/Order/Order';
import { Footer } from './modules/Footer/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { registerCart } from './redux/cartSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeCart = async () => await dispatch(registerCart());
    initializeCart();
  }, [dispatch]);

  return (
    <>
      <Header />

      <main>
        <Hero />

        <Filter />

        <Goods />

        <Subscribe />
      </main>

      <Footer />

      <Order />
    </>
  );
}

export default App;
