import './choices.scss';

export const Choices = ({ id, buttonLabel, className, children, isOpen, handleChoicesToggle }) => {
  return (
    <div className={`choices ${className}`}>
      <button id={id} className="choices__btn" type="button" onClick={handleChoicesToggle}>
        {buttonLabel}
      </button>

      {isOpen && <div className="choices__box">{children}</div>}
    </div>
  );
};
