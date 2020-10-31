import { useRouter } from 'next/router';
import Link from 'next/link';

import Head from '@/components/Head';
import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import CostTable from '@/components/CostTable';
import ProductListItem from '@/components/ProductListItem';

import useFetcher from '@/hooks/useFetcher';
import { calcCartProductsCost } from '@/utilities/index';
import { FullOrder } from '@/types/index';

import s from '@/styles/pages/ReceiptPage.module.scss';

const ReceiptPage: React.FC = () => {
  const { orderId } = useRouter().query;
  // prettier-ignore
  const { loading, error, data } = useFetcher<FullOrder>(`/api/order/${orderId}`); // TODO: fix fetching

  if (loading) return <Spinner fullScreen />;
  if (error) return <p>Something went wrong</p>;

  const {
    products,
    gift,
    giftGreeting,
    firstName,
    lastName,
    phone,
    street,
    postcode,
    deliveryASAP,
    deliveryCostSEK,
  } = data;

  const productsCost = calcCartProductsCost(products);

  return (
    <>
      <Head title="Your receipt" />
      <Layout>
        <header className={s.header}>
          <h1>Thanks for your order!</h1>
          <p>Order #{orderId}</p>
        </header>
        <section className={s.section}>
          <h2>Ordered soups</h2>
          <ul>
            {products.map(({ id, name, quantity, priceSEK }) => (
              <ProductListItem
                key={id}
                imageURL={`/images/products/${id}.jpg`}
                name={name}
                quantity={quantity}
                priceSEK={priceSEK}
              />
            ))}
          </ul>
          <CostTable
            productsCost={productsCost}
            deliveryCost={deliveryCostSEK}
          />
          <div className={s.details}>
            <h2>Recipient details</h2>
            <h3>Name</h3>
            <p>
              {firstName} {lastName}
            </p>
            <h3>Phone number</h3>
            <p>{phone}</p>
            <h3>Address</h3>
            <p>{`${street}, ${postcode}`}</p>
            <h3>Delivery date</h3>
            <p>{deliveryASAP ? 'ASAP' : '...'}</p>
            {gift && giftGreeting && (
              <>
                <h3>Gift greeting</h3>
                <p>{giftGreeting}</p>
              </>
            )}
          </div>
        </section>
        <Link href={`/track/${orderId}`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={s.trackOrderButton}>Track order progress</a>
        </Link>
      </Layout>
    </>
  );
};

export default ReceiptPage;
