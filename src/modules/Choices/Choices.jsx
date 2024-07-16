import { useEffect, useRef } from 'react';
import './choices.scss';
import { adjustElementPosititon, debounce } from '../../utils';

export const Choices = ({ id, buttonLabel, className, children, isOpen, handleChoicesToggle }) => {
  const choiceRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      adjustElementPosititon(choiceRef.current);
    }

    const debounceAdjustElementPosition = debounce(() => {
      if (isOpen) {
        adjustElementPosititon(choiceRef.current);
      }
    }, 100);

    window.addEventListener('resize', debounceAdjustElementPosition);

    return () => {
      window.removeEventListener('resize', debounceAdjustElementPosition);
    };
  }, [isOpen]);

  return (
    <div className={`choices ${className}`}>
      <button id={id} className="choices__btn" type="button" onClick={handleChoicesToggle}>
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="choices__box" ref={choiceRef}>
          {children}
        </div>
      )}
    </div>
  );
};
