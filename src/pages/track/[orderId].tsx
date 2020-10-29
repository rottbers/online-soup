/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { CgBowl } from 'react-icons/cg'; // TODO: change icon
import { BiStore, BiRocket, BiHomeSmile } from 'react-icons/bi';
import { ImMap2 } from 'react-icons/im';

import Head from '@/components/Head';
import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import RoundLink from '@/components/RoundLink';

import useFetcher from '@/hooks/useFetcher';
import { FullOrder } from '@/types/index';

import s from '@/styles/pages/TrackingPage.module.scss';

const TrackingPage: React.FC = () => {
  const { orderId } = useRouter().query;
  // prettier-ignore
  const { loading, error, data } = useFetcher<FullOrder>(`/api/order/${orderId}`); // TODO: fix fetching
  const [statusCode, setStatusCode] = useState(0); // TODO: get status from update backend. mock for now.

  if (loading) return <Spinner fullScreen />;
  if (error) return <p>Something went wrong</p>;

  const { gift } = data;

  // const statusCode = ((status) => {
  //   switch (status) {
  //     case 'pending':
  //       return 0;
  //     case 'processed':
  //       return 1;
  //     case 'enroute':
  //       return 2;
  //     case 'delivered':
  //       return 3;
  //   }
  // })(orderStatus);

  const statusPhrase = ((status) => {
    switch (status) {
      case 0:
        return 'pending';
      case 1:
        return 'being prepared';
      case 2:
        return 'on its way';
      case 3:
        return 'delivered';
    }
  })(statusCode);

  const statusMessage = `Your ${gift ? 'gift' : 'order'} is ${statusPhrase}.`;

  // TODO: implement estimates backend. Mock for now.
  const ETA = ((status) => {
    switch (status) {
      case 0:
        return '30-45 min';
      case 1:
        return '20-30 min';
      case 2:
        return '10-15 min';
      case 3:
        return '';
    }
  })(statusCode);

  const isDelivered = statusCode > 2;

  return (
    <>
      <Head title="Track your order" />
      <Layout>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          onClick={() => !isDelivered && setStatusCode(statusCode + 1)}
          className={s.mapSection}
        >
          {isDelivered && <RoundLink href="/" type="close" />}
          <ImMap2 />
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <p>// TODO: order tracking map here</p>
          <p>
            <b>Click me to emulate progress</b>
          </p>
        </div>
        <section className={s.statusInfo}>
          <h1>{statusMessage}</h1>
          {!isDelivered && (
            <p>
              Arrives in <span>{ETA}</span>
            </p>
          )}
          <div className={s.statusBar}>
            <CgBowl />
            <div
              style={statusCode > 0 ? { backgroundColor: '#20d994' } : null}
            />
            <BiStore />
            <div
              style={statusCode > 1 ? { backgroundColor: '#20d994' } : null}
            />
            <BiRocket />
            <div
              style={statusCode > 2 ? { backgroundColor: '#20d994' } : null}
            />
            <BiHomeSmile />
          </div>
        </section>
        <Link href={`/receipt/${orderId}`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={s.viewReceiptButton}>View your receipt</a>
        </Link>
      </Layout>
    </>
  );
};

export default TrackingPage;
