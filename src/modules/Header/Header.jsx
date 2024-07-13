import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../redux/cartSlice';
import './header.scss';
import { fetchGoods } from '../../redux/goodsSlice';
import { useEffect, useRef, useState } from 'react';
import { changeTitle, changeType } from '../../redux/filterSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const goodsTitle = useSelector(state => state.filter.title);
  const [searchValue, setSearchValue] = useState('');
  const searchResult = 'Результаты поиска';

  const searchInput = useRef();

  useEffect(() => {
    const title = document.querySelector('.goods__title');

    if (searchValue === '' && title.textContent === searchResult) {
      title.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchValue, goodsTitle]);

  const handlerCartToggle = () => {
    dispatch(toggleCart());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchValue.trim() !== '') {
      dispatch(changeTitle(searchResult));
      dispatch(fetchGoods({ search: searchValue }));
      dispatch(changeType(''));
      searchInput.current.value = '';
      setSearchValue('');
    }
  };

  return (
    <header className="header">
      <div className="container header__container">
        <form className="header__form" action="#" onSubmit={handleSubmit}>
          <input
            className="header__input"
            type="search"
            name="search"
            placeholder="Букет из роз"
            ref={searchInput}
            onInput={({ target }) => setSearchValue(target.value)}
          />

          <button className="header__search-button" aria-label="начать поиск">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3333 4.16663C13.3333 4.78496 13.9442 5.70829 14.5625 6.48329C15.3575 7.48329 16.3075 8.35579 17.3967 9.02163C18.2133 9.52079 19.2033 9.99996 20 9.99996M20 9.99996C19.2033 9.99996 18.2125 10.4791 17.3967 10.9783C16.3075 11.645 15.3575 12.5175 14.5625 13.5158C13.9442 14.2916 13.3333 15.2166 13.3333 15.8333M20 9.99996H4.76837e-07"
                stroke="white"
              />
            </svg>
          </button>
        </form>

        <img className="header__logo" src="/img/logo.svg" alt="Логотип Mirano Flower Boutique" />

        <button className="header__cart-button" onClick={handlerCartToggle}>
          {cartItems.length}
        </button>
      </div>
    </header>
  );
};
