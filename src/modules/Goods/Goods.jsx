import './goods.scss';
import { Cart } from '../Cart/Cart';
import { GoodsCard } from '../GoodsCard/GoodsCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGoods } from '../../redux/goodsSlice';

export const Goods = () => {
  const dispatch = useDispatch();
  const { items: goods, status: goodsStatus, error } = useSelector(state => state.goods);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      dispatch(fetchGoods());
    }
  }, [dispatch, goodsStatus]);

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
  } else {
    content = <p>{error}</p>;
  }

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>

          {content}
        </div>

        <Cart />
      </div>
    </section>
  );
};
