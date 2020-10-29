import { BiMinus, BiPlus } from 'react-icons/bi';

import s from './QuantityButtons.module.scss';

interface Props {
  min: number;
  max: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityButtons: React.FC<Props> = ({
  min,
  max,
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className={s.quantityButtons}>
      <button
        disabled={quantity <= min}
        onClick={onDecrement}
        aria-label="decrement quantity"
      >
        <BiMinus />
      </button>
      <span>{quantity}</span>
      <button
        disabled={quantity >= max}
        onClick={onIncrement}
        aria-label="increment quantity"
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default QuantityButtons;
