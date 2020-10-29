import QuantityButtons from '@/components/QuantityButtons';

import s from './ProductListItem.module.scss';

interface Props {
  imageURL: string;
  name: string;
  quantity: number;
  priceSEK: number;
  quantityButtons?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const ProductListItem: React.FC<Props> = ({
  imageURL,
  name,
  quantity,
  priceSEK,
  quantityButtons,
  onIncrement,
  onDecrement,
}) => {
  return (
    <li className={s.productListItem}>
      <img src={imageURL} alt={name} />
      <div className={s.productNameAndPrice}>
        <h3>{name}</h3>
        <p>{`${priceSEK * quantity} SEK`}</p>
      </div>
      {quantityButtons ? (
        <QuantityButtons
          min={0}
          max={99}
          quantity={quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ) : (
        <span>x{quantity}</span>
      )}
    </li>
  );
};

export default ProductListItem;
