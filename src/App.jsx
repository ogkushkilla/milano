import { Header } from './modules/Header/Header';
import { Hero } from './modules/Hero/Hero';
import { Filter } from './modules/Filter/Filter';
import { Goods } from './modules/Goods/Goods';
import { Subscribe } from './modules/Subscribe/Subscribe';
import { Order } from './modules/Order/Order';
import { Footer } from './modules/Footer/Footer';

function App() {
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
