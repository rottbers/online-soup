import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import Head from '@/components/Head';
import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import RoundLink from '@/components/RoundLink';

import { useOrderContext } from '@/contexts/OrderContext';
import { post, calcCartProductsCost } from '@/utilities/index';

import s from '@/styles/pages/PaymentPage.module.scss';

type PaymentState = {
  status: 'idle' | 'processing' | 'success' | 'error';
  error: string;
};

type PaymentEvent =
  | { type: 'IDLE' | 'PROCESSING' | 'SUCCESS' }
  | { type: 'ERROR'; error: string };

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { state: orderState, dispatch: orderDispatch } = useOrderContext();
  // prettier-ignore
  const [paymentState, paymentDispatch] = useReducer(reducer, {status: 'idle', error: ''});

  function reducer(state: PaymentState, event: PaymentEvent) {
    switch (event.type) {
      case 'IDLE': {
        return { status: 'idle' };
      }
      case 'PROCESSING': {
        return { status: 'processing', error: '' };
      }
      case 'SUCCESS': {
        return { ...state, status: 'success' };
      }
      case 'ERROR': {
        return { status: 'error', error: event.error };
      }
      default: {
        return state;
      }
    }
  }

  // redirect to landing page if empty cart
  useEffect(() => {
    if (!orderState.products.length) router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartTotal = calcCartProductsCost(orderState.products);
  const totalCost = cartTotal + 39;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      paymentDispatch({ type: 'PROCESSING' });

      // TODO: calc amount server side
      // prettier-ignore
      const { clientSecret } = await post<{ clientSecret: string }>('/api/payment-intent', { amount: (totalCost * 100) });

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) throw Error(error.message);

      // TODO: validate payment server side through payment webhook
      // prettier-ignore
      const { orderId } = await post<{ orderId: string }>('/api/order/create', orderState);

      paymentDispatch({ type: 'SUCCESS' });

      setTimeout(() => router.push(`/receipt/${orderId}`), 2000);

      orderDispatch({ type: 'RESET_DETAILS' });
    } catch (error) {
      paymentDispatch({ type: 'ERROR', error: error.message });
    }
  }

  const cardElementOptions = {
    iconsStyle: 'solid',
    style: {
      base: {
        fontSize: '16px',
        fontFamily: 'Quicksand, sans-serif',
        color: '#050505',
        '::placeholder': {
          color: '#9d9d9d',
        },
      },
      complete: {
        color: '#138057',
      },
      invalid: {
        color: '#e8112b',
        iconColor: '#e8112b',
      },
    },
  };

  const isIdle = paymentState.status === 'idle';
  const isProcessing = paymentState.status === 'processing';
  const isSuccess = paymentState.status === 'success';
  const isError = paymentState.status === 'error';

  return (
    <>
      <Head title="Payment" />
      <Layout>
        <header className={s.header}>
          <RoundLink href="/checkout" type="back" />
          <h1>Payment</h1>
          <div></div>
        </header>
        <form className={s.form} onSubmit={onSubmit}>
          <span role="alert">{paymentState.error}</span>
          <CardElement options={cardElementOptions} />
          <button type="submit" disabled={isProcessing || isSuccess}>
            {isIdle && `Pay ${totalCost} SEK`}
            {isProcessing && <Spinner />}
            {isSuccess && 'Payment successful ✌️'}
            {isError && `Pay ${totalCost} SEK`}
          </button>
        </form>
      </Layout>
    </>
  );
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentPageWrapper: React.FC = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default PaymentPageWrapper;
