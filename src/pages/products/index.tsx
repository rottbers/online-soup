import Link from 'next/link';

import Head from '@/components/Head';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import RoundLink from '@/components/RoundLink';

import { useOrderContext } from '@/contexts/OrderContext';
import { generateSlug, calcCartQuantity } from '@/utilities/index';

import s from '@/styles/pages/ProductsPage.module.scss';

import products from '../../mockProducts';

const ProductsPage: React.FC = () => {
  const { state } = useOrderContext();
  const { products: productsInCart } = state;

  const itemsInCart = calcCartQuantity(productsInCart);

  return (
    <>
      <Head
        description="Soups with locally sourced ingredients, delivered in Stockholm"
        path="/products"
      />
      <Layout>
        <header className={s.header}>
          <RoundLink type="back" href="/" />
          <h1>Our soups</h1>
          {itemsInCart > 0 && (
            <RoundLink
              type="cart"
              href="/checkout"
              badge
              badgeContent={itemsInCart}
            />
          )}
        </header>
        <ul className={s.products}>
          {products.map(({ id, name, priceSEK, imageURL }) => (
            <li key={id}>
              <Link href={`/products/${generateSlug(id, name)}`}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  <ProductCard
                    name={name}
                    imageURL={imageURL}
                    priceSEK={priceSEK}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
};

export default ProductsPage;
