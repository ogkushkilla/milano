import { Header } from './modules/Header/Header';
import { Hero } from './modules/Hero/Hero';
import { Filter } from './modules/Filter/Filter';
import { Goods } from './modules/Goods/Goods';
import { Subscribe } from './modules/Subscribe/Subscribe';
import { Order } from './modules/Order/Order';
import { Footer } from './modules/Footer/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart } from './redux/thunks/fetchCart';
import { registerCart } from './redux/thunks/registerCart';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };

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
