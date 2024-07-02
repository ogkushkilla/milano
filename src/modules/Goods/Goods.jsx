import './goods.scss';
import { Cart } from '../Cart/Cart';
import { goodsArray } from '../../goodsArray';
import { GoodsCard } from '../GoodsCard/GoodsCard';

export const Goods = () => {
  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>

          <ul className="goods__list">
            {goodsArray.map(item => (
              <li key={item.id} className="goods__item">
                <GoodsCard {...item} />
              </li>
            ))}
          </ul>
        </div>

        <Cart />
      </div>
    </section>
  );
};
