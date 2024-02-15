import './CardButton.css';

function CardButton({ children, className }) {
  const class_name = 'card-button' + (className ? ' '+ className : '');

  return (
    <button className={class_name}>
        {children}
    </button>
  );
}

export default CardButton;
