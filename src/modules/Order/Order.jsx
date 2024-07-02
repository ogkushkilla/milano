import './order.scss';

export const Order = ({ title, style, children }) => {
  return (
    <div className="order" style={style}>
      <div className="order__wrapper">
        <h2 className="order__title">{title}</h2>
        {children}
      </div>
    </div>
  );
};
