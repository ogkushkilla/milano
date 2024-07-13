import './filter.scss';
import { Choices } from '../Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { debounce, getFilterParams } from '../../utils';
import { changeFilters, changeTitle, changeType } from '../../redux/filterSlice';
import { FilterRadio } from './FilterRadio';

export const Filter = () => {
  const dispatch = useDispatch();
  const type = useSelector(state => state.filter.type);
  const filters = useSelector(state => state.filter.filters);
  const filterTypes = [
    { type: 'bouquets', title: 'Цветы' },
    { type: 'toys', title: 'Игрушки' },
    { type: 'postcards', title: 'Открытки' },
  ];
  const [openChoice, setOpenChoice] = useState(null);

  const handleChoicesToggle = choice => {
    setOpenChoice(openChoice === choice ? null : choice);
  };

  const prevTypeRef = useRef(type);

  const debounceFetchGoods = useRef(
    debounce(filters => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    const prevType = prevTypeRef.current;
    const filterParams = getFilterParams({ type, ...filters });

    if (prevType !== type) {
      dispatch(fetchGoods(filterParams));
    } else {
      debounceFetchGoods(filterParams);
    }

    prevTypeRef.current = type;
  }, [dispatch, debounceFetchGoods, filters]);

  const handleTypeChange = ({ target }) => {
    const { value } = target;
    const newFilters = {
      ...filters,
      minPrice: '',
      maxPrice: '',
    };
    dispatch(changeType(value));
    dispatch(changeFilters(newFilters));
    dispatch(changeTitle(target.nextSibling.textContent));
    setOpenChoice(false);
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    const newFilters = { ...filters, [name]: value ? parseInt(value) : '' };
    dispatch(changeFilters(newFilters));
  };

  return (
    <section className="filter">
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            {filterTypes.map(item => (
              <FilterRadio
                key={item.type}
                filterType={type}
                radioType={item.type}
                radioTitle={item.title}
                handleTypeChange={handleTypeChange}
              />
            ))}
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
