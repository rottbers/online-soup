import { useState } from 'react';
import { useRouter } from 'next/router';

import Head from '@/components/Head';
import Layout from '@/components/Layout/';
import Spinner from '@/components/Spinner';
import RoundLink from '@/components/RoundLink';
import QuantityButtons from '@/components/QuantityButtons/';

import { useOrderContext } from '@/contexts/OrderContext';
import { parseIdFromSlug, calcCartQuantity } from '@/utilities/index';

import s from '@/styles/pages/ProductPage.module.scss';

import products from '../../mockProducts';

const ProductPage: React.FC = () => {
  const { productSlug } = useRouter().query;
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useOrderContext();
  const { products: productsInCart } = state;

  if (!productSlug) return <Spinner fullScreen />;

  // @ts-expect-error TODO: look into next router types
  const productId = parseIdFromSlug(productSlug);

  const product = products.filter((product) => product.id === productId)[0];

  const { name, description, ingredients, priceSEK, imageURL } = product;

  function handleAddProduct() {
    dispatch({
      type: 'ADD_PRODUCT',
      data: { ...product, quantity },
    });
  }

  const itemsInCart = calcCartQuantity(productsInCart);

  return (
    <>
      <Head title={name} description={description} image={imageURL} />
      <Layout>
        <div className={s.productHero}>
          <nav>
            <RoundLink href="/" type="back" />
            {itemsInCart !== 0 && (
              <RoundLink
                href="/checkout"
                type="cart"
                badge
                badgeContent={itemsInCart}
              />
            )}
          </nav>
          <img src={imageURL} alt={name} />
        </div>
        <section className={s.productInfo}>
          <h1>{name}</h1>
          <p>{description}</p>
          <p>
            <b>Ingredients:</b>
            {ingredients.map(({ name }, index) => (
              <span key={name}>
                {' '}
                {name}
                {ingredients.length - 1 !== index ? ',' : '.'}
              </span>
            ))}
          </p>
        </section>
        <div className={s.buttonsContainer}>
          <div style={{ padding: '16px 12px' }}>
            <QuantityButtons
              min={1}
              max={99}
              quantity={quantity}
              onIncrement={() => setQuantity(quantity + 1)}
              onDecrement={() => setQuantity(quantity - 1)}
            />
          </div>
          <button className={s.addToCartButton} onClick={handleAddProduct}>
            <span>Add to cart </span>
            <span>{priceSEK * quantity} SEK</span>
          </button>
        </div>
      </Layout>
    </>
  );
};

export default ProductPage;
