import { useState } from 'react';
import './choices.scss';

export const Choices = ({ id, buttonLabel, className, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(oldIsOpen => !oldIsOpen);
  };

  return (
    <div className={`choices ${className}`}>
      <button id={id} className="choices__btn" type="button" onClick={handleToggle}>
        {buttonLabel}
      </button>

      {isOpen && <div className="choices__box">{children}</div>}
    </div>
  );
};
