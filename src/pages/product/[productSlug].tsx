import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import Head from '@/components/Head';
import Layout from '@/components/Layout/';
import RoundLink from '@/components/RoundLink';
import QuantityButtons from '@/components/QuantityButtons/';

import { useOrderContext } from '@/contexts/OrderContext';
import {
  parseIdFromSlug,
  generateSlug,
  calcCartQuantity,
} from '@/utilities/index';
import { Product } from '@/types/index';

import s from '@/styles/pages/ProductPage.module.scss';

import products from '../../mockProducts';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => {
    const productSlug = generateSlug(product.id, product.name);
    return { params: { productSlug } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productSlug =
    params.productSlug === typeof 'string'
      ? params.productSlug
      : params.productSlug[0];
  const productId = parseIdFromSlug(productSlug);
  const product = products.filter((product) => product.id === productId)[0];

  return { props: { product, productSlug } };
};

interface Props {
  product: Product;
  productSlug: string;
}

const ProductPage: React.FC<Props> = ({ product, productSlug }) => {
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useOrderContext();
  const { products: productsInCart } = state;

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
      <Head
        title={name}
        description={description}
        imageURL={imageURL}
        path={`/${productSlug}`}
      />
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
          <div style={{ padding: '0px 12px' }}>
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
