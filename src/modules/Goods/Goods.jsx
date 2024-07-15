import './goods.scss';
import { Cart } from '../Cart/Cart';
import { GoodsCard } from '../GoodsCard/GoodsCard';
import { useSelector } from 'react-redux';

export const Goods = () => {
  const { items: goods, status: goodsStatus, error } = useSelector(state => state.goods);
  const { title } = useSelector(state => state.filter);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <p>Загрузка...</p>;
  } else if (goodsStatus === 'success') {
    content = (
      <ul className="goods__list">
        {goods.map(item => (
          <li key={item.id} className="goods__item">
            <GoodsCard {...item} dateDelivery="сегодня в 14:00" />
          </li>
        ))}
      </ul>
    );
  }

  if (goodsStatus === 'success' && !goods.length) {
    content = <p className="goods__empty">По вашему запросу ничего не найдено</p>;
  }

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">{title}</h2>

          {content}
        </div>

        <Cart />
      </div>
    </section>
  );
};
