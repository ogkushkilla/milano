import './filter.scss';
import { Choices } from '../Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { debounce, getFilterParams } from '../../utils';
import { changeFilters } from '../../redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filter.filters);
  const [openChoice, setOpenChoice] = useState(null);

  const handleChoicesToggle = choice => {
    setOpenChoice(openChoice === choice ? null : choice);
  };

  const prevFiltersRef = useRef({});

  const debounceFetchGoods = useRef(
    debounce(filters => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const filterParams = getFilterParams(filters);

    if (prevFilters.type !== filters.type) {
      dispatch(fetchGoods(filterParams));
    } else {
      debounceFetchGoods(filters);
    }

    prevFiltersRef.current = filters;
  }, [dispatch, debounceFetchGoods, filters]);

  const handleClick = ({ target }) => {
    const { value } = target;
    const newFilters = { ...filters, type: value, minPrice: '', maxPrice: '' };
    dispatch(changeFilters(newFilters));
    setOpenChoice(false);
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    const newFilters = { ...filters, [name]: value ? parseInt(value) : '' };
    changeFilters(newFilters);
  };

  return (
    <section className="filter">
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            <input
              className="filter__radio"
              type="radio"
              name="type"
              defaultValue="bouquets"
              id="flower"
              defaultChecked
              onClick={handleClick}
            />
            <label className="filter__label filter__label_flower" htmlFor="flower">
              Цветы
            </label>

            <input
              className="filter__radio"
              type="radio"
              name="type"
              defaultValue="toys"
              id="toys"
              onClick={handleClick}
            />
            <label className="filter__label filter__label_toys" htmlFor="toys">
              Игрушки
            </label>

            <input
              className="filter__radio"
              type="radio"
              name="type"
              defaultValue="postcards"
              id="postcard"
              onClick={handleClick}
            />
            <label className="filter__label filter__label_postcard" htmlFor="postcard">
              Открытки
            </label>
          </fieldset>

          <fieldset className="filter__group filter__group_choices">
            <Choices
              buttonLabel={'Цена'}
              className="filter__choices_type"
              isOpen={openChoice === 'price'}
              handleChoicesToggle={() => handleChoicesToggle('price')}
            >
              <fieldset className="filter__price">
                <input
                  className="filter__input-price"
                  type="number"
                  name="minPrice"
                  placeholder="от"
                  value={filters.minPrice}
                  onInput={handleInput}
                />
                <input
                  className="filter__input-price"
                  type="number"
                  name="maxPrice"
                  placeholder="до"
                  value={filters.maxPrice}
                  onInput={handleInput}
                />
              </fieldset>
            </Choices>

            <Choices
              buttonLabel={'Тип товара'}
              className="filter__choices_type"
              isOpen={openChoice === 'type'}
              handleChoicesToggle={() => handleChoicesToggle('type')}
            >
              <ul className="filter__type-list">
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Монобукеты
                  </button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Авторские букеты
                  </button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Цветы в коробке
                  </button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Цветы в корзине
                  </button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Букеты из сухоцветов
                  </button>
                </li>
              </ul>
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
