import { useDispatch } from 'react-redux';
import { API_URL } from '../../const';
import { useState } from 'react';
import { isNumber } from '../../utils';
import { addItemToCart } from '../../redux/thunks/addItemToCart';

export const CartItem = ({ id, photoUrl, name, price, quantity }) => {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);

  const handleInputChange = ({ target }) => {
    const newQuantity = parseInt(target.value);
    setInputQuantity(newQuantity);
    if (isNumber(newQuantity)) {
      dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
    }
  };

  const handleDecrement = () => {
    const newQuantity = inputQuantity - 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  const handleIncrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  return (
    <>
      <img className="cart__img" src={`${API_URL}${photoUrl}`} alt={name} />
      <h4 className="cart__item-title">{name}</h4>
      <div className="cart__counter">
        <button className="cart__counter-btn" onClick={handleDecrement}>
          -
        </button>
        <input
          className="cart__counter-input"
          type="number"
          max="99"
          min="0"
          value={inputQuantity}
          onChange={handleInputChange}
        />
        <button className="cart__counter-btn" onClick={handleIncrement}>
          +
        </button>
      </div>
      <p className="cart__price">{inputQuantity ? price * quantity : 0}&nbsp;₽</p>
    </>
  );
};
