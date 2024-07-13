export const FilterRadio = ({ filterType, radioType, radioTitle, handleTypeChange }) => {
  return (
    <>
      <input
        className="filter__radio"
        type="radio"
        name="type"
        defaultValue={radioType}
        id={radioType}
        checked={filterType === radioType}
        onChange={handleTypeChange}
      />
      <label className={`filter__label filter__label_${radioType}`} htmlFor={radioType}>
        {radioTitle}
      </label>
    </>
  );
};
