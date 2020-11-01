import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AlgoliaPlaces from 'algolia-places-react';
import { motion } from 'framer-motion';

import Head from '@/components/Head';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import RoundLink from '@/components/RoundLink';

import { useOrderContext } from '@/contexts/OrderContext';
import { generateSlug, calcCartQuantity } from '@/utilities/index';

import s from '@/styles/pages/LandingPage.module.scss';

import products from '../mockProducts';

const LandingPage: React.FC = () => {
  const [withinDeliveryArea, setWithinDeliveryArea] = useState(null);
  const [showAreaSearchMessage, setShowAreaSearchMessage] = useState(false);
  const { state, dispatch } = useOrderContext();
  const { products: productsInCart } = state;

  const itemsInCart = calcCartQuantity(productsInCart);

  const algoliaOptions = {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APPID,
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY,
    language: 'en',
    countries: ['se'],
    type: 'address',
  };

  function onChange(data) {
    const { administrative, postcode, name: street } = data.suggestion;

    if (administrative !== 'Stockholms län') {
      setWithinDeliveryArea(false);
    } else {
      setWithinDeliveryArea(true);
      dispatch({ type: 'UPDATE_DETAILS', data: { street, postcode } });
    }
    setShowAreaSearchMessage(true);
  }

  const productsRef = useRef(null);
  const scrollToProducts = () =>
    setTimeout(
      () =>
        window.scrollTo({
          top: productsRef.current.offsetTop,
          behavior: 'smooth',
        }),
      100
    );

  return (
    <>
      <Head
        description="Soups with locally sourced ingredients, delivered in Stockholm"
        path="/"
      />
      <Layout>
        <header className={s.header}>
          <Image
            src="/images/favicon-192x192.png"
            alt="logo"
            width={50}
            height={50}
          />
          {itemsInCart > 0 && (
            <RoundLink
              type="cart"
              href="/checkout"
              badge
              badgeContent={itemsInCart}
            ></RoundLink>
          )}
        </header>
        <section
          className={s.hero}
          style={{ backgroundImage: 'url(/images/hero.png)' }}
        >
          <div className={s.heroInner}>
            <h1>Fresh from the farm right to your door</h1>
            <AlgoliaPlaces
              placeholder="Enter your address"
              options={algoliaOptions}
              onChange={(data) => onChange(data)}
              onClear={() => setShowAreaSearchMessage(false)}
            />
            {showAreaSearchMessage && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                role="status"
              >
                {withinDeliveryArea ? (
                  <>
                    👌 Yay! We deliver to you - now{' '}
                    <button onClick={scrollToProducts}>pick some soups</button>!
                  </>
                ) : (
                  <>😔 Sorry, we only deliver within Stockholm</>
                )}
              </motion.span>
            )}
          </div>
        </section>
        <section className={s.products} ref={productsRef} id="all-soups">
          <h2>All our soups</h2>
          <ul>
            {products.map(({ id, name, priceSEK, imageURL }) => (
              <li key={id}>
                <Link href={`/product/${generateSlug(id, name)}`}>
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
        </section>
        <footer className={s.footer}>
          <p>{`< online soup delivery footer />`}</p>
        </footer>
      </Layout>
    </>
  );
};

export default LandingPage;
