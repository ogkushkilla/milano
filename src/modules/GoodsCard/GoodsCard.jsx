import { useDispatch } from 'react-redux';
import './card.scss';
import { addItemToCart } from '../../redux/cartSlice';
import { API_URL } from '../../const';

export const GoodsCard = ({ id, photoUrl, name, dateDelivery, price }) => {
  const dispatch = useDispatch();

  const handlerAddToCart = () => {
    dispatch(addItemToCart({ id, photoUrl, name, dateDelivery, price }));
  };

  return (
    <article className="goods__card card">
      <img className="card__image" src={`${API_URL}${photoUrl}`} alt={name} />
      <div className="card__content">
        <h3 className="card__title">{name}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>
          <button className="card__button" onClick={handlerAddToCart}>
            {price}&nbsp;₽
          </button>
        </div>
      </div>
    </article>
  );
};
