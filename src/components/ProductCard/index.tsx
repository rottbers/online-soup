import styles from './ProductCard.module.scss';

interface Props {
  imageURL: string;
  name: string;
  priceSEK: number;
  description?: string;
}

const ProductCard: React.FC<Props> = ({
  imageURL,
  name,
  description,
  priceSEK,
}) => (
  <div className={styles.card}>
    <img src={imageURL} alt={name} />
    <h3>
      <span>{name}</span> <span>{priceSEK} SEK</span>
    </h3>
    {description && <p>{description}</p>}
  </div>
);

export default ProductCard;
