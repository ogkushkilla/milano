import { useDispatch, useSelector } from 'react-redux';
import './order.scss';
import { closeModal, updateOrderData } from '../../redux/slices/orderSlice';
import { useCallback, useEffect } from 'react';
import { sendOrder } from '../../redux/thunks/sendOrder';

export const Order = () => {
  const dispatch = useDispatch();
  const isOrderModalOpen = useSelector(state => state.order.isOpen);
  const orderId = useSelector(state => state.order.orderId);
  const orderData = useSelector(state => state.order.data);
  const cartItems = useSelector(state => state.cart.items);

  const handlerClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        handlerClose(e);
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handlerClose]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendOrder());
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    dispatch(updateOrderData({ [name]: value }));
  };

  if (!isOrderModalOpen) return null;

  return (
    <div className="order" onClick={handlerClose}>
      <div className="order__wrapper" onClick={e => e.stopPropagation()}>
        {orderId ? (
          <>
            <h2 className="order__title">Заказ оформлен!</h2>
            <p className="order__id">Ваш номер заказа: {orderId}</p>
          </>
        ) : (
          <>
            <h2 className="order__title">Оформить заказ</h2>

            <form className="order__form" id="order" onSubmit={handleSubmit}>
              <fieldset className="order__fieldset">
                <legend className="order__legend">Данные заказчика</legend>
                <div className="order__input-group">
                  <input
                    className="order__input"
                    type="text"
                    name="buyerName"
                    placeholder="Имя"
                    value={orderData.buyerName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="order__input"
                    type="text"
                    name="buyerPhone"
                    placeholder="Телефон"
                    value={orderData.buyerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="order__fieldset">
                <legend className="order__legend">Данные получателя</legend>
                <div className="order__input-group">
                  <input
                    className="order__input"
                    type="text"
                    name="recipientName"
                    placeholder="Имя"
                    value={orderData.recipientName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="order__input"
                    type="text"
                    name="recipientPhone"
                    placeholder="Телефон"
                    value={orderData.recipientPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="order__fieldset">
                <legend className="order__legend">Адрес</legend>
                <div className="order__input-group">
                  <input
                    className="order__input"
                    type="text"
                    name="street"
                    placeholder="Улица"
                    value={orderData.street}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="order__input order__input_min"
                    type="text"
                    name="house"
                    placeholder="Дом"
                    value={orderData.house}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="order__input order__input_min"
                    type="text"
                    name="apartment"
                    placeholder="Квартира"
                    value={orderData.apartment}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="order__fieldset">
                <div className="order__payment">
                  <label className="order__label-radio">
                    <input
                      className="order__radio"
                      type="radio"
                      name="paymentOnline"
                      value={orderData.paymentOnline === 'true'}
                      onChange={handleChange}
                      defaultChecked
                    />
                    Оплата онлайн
                  </label>
                </div>
                <div className="order__delivery">
                  <label htmlFor="delivery">Дата доставки</label>
                  <input
                    className="order__input"
                    type="date"
                    name="deliveryDate"
                    value={orderData.deliveryDate}
                    onChange={handleChange}
                  />
                  <div className="order__select-wrapper">
                    <select
                      className="order__select"
                      name="deliveryTime"
                      id="delivery"
                      value={orderData.deliveryTime}
                      onChange={handleChange}
                      required
                    >
                      <option defaultValue="9-12">с 9:00 до 12:00</option>
                      <option defaultValue="12-15">с 12:00 до 15:00</option>
                      <option defaultValue="15-18">с 15:00 до 18:00</option>
                      <option defaultValue="18-21">с 18:00 до 21:00</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </form>
            <div className="order__footer">
              <p className="order__total">
                {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}&nbsp;₽
              </p>
              <button className="order__button" type="submit" form="order">
                Заказать
              </button>
            </div>
          </>
        )}
      </div>
      <button className="order__close" type="button" onClick={handlerClose}>
        ×
      </button>
    </div>
  );
};
