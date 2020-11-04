import Image from 'next/image';

import s from './ProductCard.module.scss';

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
  <div className={s.card}>
    <Image
      src={imageURL}
      alt={name}
      layout="intrinsic"
      width={400}
      height={250}
    />
    <h3>
      <span>{name}</span> <span>{priceSEK} SEK</span>
    </h3>
    {description && <p>{description}</p>}
  </div>
);

export default ProductCard;
