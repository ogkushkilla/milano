import './cart.scss';
import { CartItem } from '../CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../redux/slices/cartSlice';
import { openModal } from '../../redux/slices/orderSlice';
import { useEffect, useRef } from 'react';
import { Preload } from '../Preload/Preload';

export const Cart = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(state => state.cart.isOpen);
  const cartItems = useSelector(state => state.cart.items);
  const status = useSelector(state => state.cart.status);

  const cartRef = useRef();

  useEffect(() => {
    if (isCartOpen) {
      cartRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isCartOpen]);

  const handlerCartClose = () => {
    dispatch(toggleCart(false));
  };

  const handlerOpenOrder = () => {
    dispatch(openModal());
  };

  if (!isCartOpen) return null;

  return (
    <section className="cart cart_open" ref={cartRef}>
      <div className="cart__container">
        <div className="cart__header">
          <h3 className="cart__title">Ваш заказ</h3>

          <button className="cart__close" onClick={handlerCartClose}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5.70715" width="1" height="25" transform="rotate(-45 5 5.70715)" fill="#D17D2F" />
              <rect x="22.6777" y="5" width="1" height="25" transform="rotate(45 22.6777 5)" fill="#D17D2F" />
            </svg>
          </button>
        </div>

        <p className="cart__date-delivery">сегодня в 14:00</p>

        {status === 'loading' ? (
          <div className="cart__preload">
            <Preload />
          </div>
        ) : (
          <ul className="cart__list">
            {cartItems.map(item => (
              <li key={item.id} className="cart__item">
                <CartItem {...item} />
              </li>
            ))}
          </ul>
        )}

        <div className="cart__footer">
          <button className="cart__order-btn" onClick={handlerOpenOrder} disabled={!cartItems.length}>
            Оформить
          </button>
          <p className="cart__price cart__price_total">
            {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}&nbsp;₽
          </p>
        </div>
      </div>
    </section>
  );
};
