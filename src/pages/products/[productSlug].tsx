import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { RiLeafLine } from 'react-icons/ri';

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
    typeof params.productSlug === 'string'
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

  const { name, description, ingredients, priceSEK, imageURL, vegan } = product;

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
        path={`/products/${productSlug}`}
      />
      <Layout>
        <div className={s.hero}>
          <nav>
            <RoundLink href="/products" type="back" />
            {itemsInCart !== 0 && (
              <RoundLink
                href="/checkout"
                type="cart"
                badge
                badgeContent={itemsInCart}
              />
            )}
          </nav>
          <Image src={imageURL} alt={name} layout="fill" />
        </div>
        <section className={s.info}>
          <header>
            <h1>{name}</h1>
            {vegan && (
              <p>
                vegan <RiLeafLine />
              </p>
            )}
          </header>
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
        <div className={s.buttons}>
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
