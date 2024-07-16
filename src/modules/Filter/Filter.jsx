import './filter.scss';
import { Choices } from '../Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, getFilterParams } from '../../utils';
import { changeCategory, changeFilters, changeTitle, changeType } from '../../redux/slices/filterSlice';
import { FilterRadio } from './FilterRadio';
import { fetchGoods } from '../../redux/thunks/fetchGoods';

export const Filter = () => {
  const dispatch = useDispatch();
  const type = useSelector(state => state.filter.type);
  const search = useSelector(state => state.filter.search);
  const filters = useSelector(state => state.filter.filters);
  const categories = useSelector(state => state.goods.categories);
  const filterTypes = [
    { type: 'bouquets', title: 'Цветы' },
    { type: 'toys', title: 'Игрушки' },
    { type: 'postcards', title: 'Открытки' },
  ];
  const [openChoice, setOpenChoice] = useState(null);

  const handleChoicesToggle = choice => {
    setOpenChoice(openChoice === choice ? null : choice);
  };

  const filterRef = useRef(null);
  const prevFiltersRef = useRef(filters);

  const debounceFetchGoods = useRef(
    debounce(filters => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    if (filters !== prevFiltersRef.current || search) {
      filterRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filters, search]);

  useEffect(() => {
    const prevMinPrice = prevFiltersRef.current.minPrice;
    const prevMaxPrice = prevFiltersRef.current.maxPrice;
    const filterParams = getFilterParams({ type, search, ...filters });

    if (!filterParams.type && !filterParams.search) {
      return;
    }

    if (prevMinPrice !== filters.minPrice || prevMaxPrice !== filters.maxPrice) {
      debounceFetchGoods(filterParams);
    } else {
      dispatch(fetchGoods(filterParams));
    }

    if (filterParams.search) {
      dispatch(changeTitle('Результаты поиска'));
    }

    prevFiltersRef.current = filters;
  }, [dispatch, debounceFetchGoods, filters, type, search]);

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

  const handleCategoryChange = category => {
    dispatch(changeCategory(category));
  };

  return (
    <section className="filter" ref={filterRef}>
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

            {categories.length ? (
              <Choices
                buttonLabel={'Тип товара'}
                className="filter__choices_type"
                isOpen={openChoice === 'type'}
                handleChoicesToggle={() => handleChoicesToggle('type')}
              >
                <ul className="filter__type-list">
                  <li className="filter__type-item">
                    <button className="filter__type-button" type="button" onClick={() => handleCategoryChange('')}>
                      Все товары
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category} className="filter__type-item">
                      <button
                        className={`filter__type-button${category === filters.category ? '_active' : ''}`}
                        type="button"
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </Choices>
            ) : null}
          </fieldset>
        </form>
      </div>
    </section>
  );
};
