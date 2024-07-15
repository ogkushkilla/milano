import { useDispatch, useSelector } from 'react-redux';
import './card.scss';
import { API_URL } from '../../const';
import { addItemToCart } from '../../redux/thunks/addItemToCart';
import { toggleCart } from '../../redux/slices/cartSlice';

export const GoodsCard = ({ id, photoUrl, name, dateDelivery, price }) => {
  const isCartOpen = useSelector(state => state.cart.isOpen);
  const dispatch = useDispatch();

  const handlerAddToCart = () => {
    dispatch(addItemToCart({ productId: id }));

    if (!isCartOpen) {
      dispatch(toggleCart());
    }
  };

  const handlerButtonHover = ({ target }) => {
    if (target.textContent.includes('₽')) {
      target.classList.add('card__button-hover');
      target.textContent = 'В корзину';
    } else {
      target.classList.remove('card__button-hover');
      target.textContent = `${price} ₽`;
    }
  };

  return (
    <article className="goods__card card">
      <img className="card__image" src={`${API_URL}${photoUrl}`} alt={name} />
      <div className="card__content">
        <h3 className="card__title">{name}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>
          <button
            className="card__button"
            onClick={handlerAddToCart}
            onMouseEnter={handlerButtonHover}
            onMouseLeave={handlerButtonHover}
          >
            {price}&nbsp;₽
          </button>
        </div>
      </div>
    </article>
  );
};
