import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Head from '@/components/Head';
import Layout from '@/components/Layout';
import ProductListItem from '@/components/ProductListItem';
import RoundLink from '@/components/RoundLink';
import CostTable from '@/components/CostTable';

import { useOrderContext } from '@/contexts/OrderContext';
import { calcCartProductsCost } from '@/utilities/index';

import { Order } from '@/types/index';

import s from '@/styles/pages/CheckoutPage.module.scss';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, errors, watch } = useForm();
  const { state, dispatch } = useOrderContext();

  const {
    giftGreeting,
    firstName,
    lastName,
    phone,
    street,
    postcode,
    products,
  } = state;

  // redirect to landing page if empty cart
  useEffect(() => {
    if (!products.length && router) router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(data: Partial<Order>) {
    dispatch({ type: 'UPDATE_DETAILS', data });
    router.push('/pay');
  }

  const deliveryCostSEK = 39; // TODO: calc delivery cost backend?
  const productsCost = calcCartProductsCost(products);
  const totalCost = deliveryCostSEK + productsCost;

  const productsInCart = products.length !== 0;
  const canSubmit = Object.keys(errors).length === 0 && productsInCart;

  const isGift = watch('gift');

  return (
    <>
      <Head title="Checkout" />
      <Layout>
        <header className={s.header}>
          <RoundLink href="/" type="back" />
          <h1>Checkout</h1>
          <div></div>
        </header>
        <section className={s.section}>
          {productsInCart ? (
            <>
              <ul>
                {products.map(({ id, name, quantity, priceSEK }) => (
                  <ProductListItem
                    key={id}
                    imageURL={`/images/products/${id}.jpg`}
                    name={name}
                    quantity={quantity}
                    priceSEK={priceSEK}
                    quantityButtons
                    onIncrement={() =>
                      dispatch({ type: 'INCREMENT_QUANTITY', data: { id } })
                    }
                    onDecrement={() =>
                      dispatch({ type: 'DECREMENT_QUANTITY', data: { id } })
                    }
                  />
                ))}
              </ul>
              <CostTable
                productsCost={productsCost}
                deliveryCost={deliveryCostSEK}
              />
            </>
          ) : (
            <p style={{ textAlign: 'center' }}>
              Looks pretty empty here, navigate back and add some soups to make
              an order.
            </p>
          )}
          <form className={s.form} id="form" onSubmit={handleSubmit(onSubmit)}>
            {/* TODO: style checkbox */}
            {/* <h2>Is this a gift?</h2>
            <input
              name="gift"
              type="checkbox"
              defaultChecked={gift}
              ref={register}
            /> */}
            {isGift && (
              <>
                <label htmlFor="giftGreeting">
                  Gift greeting <span>(optional)</span>
                </label>
                <textarea
                  name="giftGreeting"
                  placeholder="Add a greeting along with the gift to the recipient"
                  rows={4}
                  defaultValue={giftGreeting}
                  ref={register({
                    maxLength: {
                      value: 5000,
                      message:
                        'Sorry, bit too long - keep it under 5000 characters',
                    },
                  })}
                />
                <span role="alert">{errors?.giftGreeting?.message}</span>
              </>
            )}
            <h2>{isGift ? 'Recipient' : 'Your'} details</h2>
            <p>To whom in Stockholm should we deliver?</p>
            <div className={s.formRow}>
              <div>
                <label htmlFor="firstName">First name</label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                  defaultValue={firstName}
                  ref={register({
                    required: {
                      value: true,
                      message: 'First name is required',
                    },
                  })}
                />
                <span role="alert">{errors?.firstName?.message}</span>
              </div>
              <div>
                <label htmlFor="lastName">Last name</label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  defaultValue={lastName}
                  ref={register({
                    required: { value: true, message: 'Last name is required' },
                  })}
                />
                <span role="alert">{errors?.lastName?.message}</span>
              </div>
            </div>

            <label htmlFor="phone">Phone number</label>
            <input
              name="phone"
              type="tel"
              placeholder="070 123 45 67"
              defaultValue={phone}
              ref={register({
                required: { value: true, message: 'Phone number is required' },
                // TODO: phone validation regex
              })}
            />
            <span role="alert">{errors?.phone?.message}</span>

            <label htmlFor="street">Street</label>
            <input
              type="text"
              name="street"
              placeholder="Drottninggatan 13"
              defaultValue={street}
              ref={register({
                required: { value: true, message: 'Street is required' },
              })}
            />
            <span role="alert">{errors?.street?.message}</span>

            <label htmlFor="postcode">Postal code</label>
            <input
              type="text"
              inputMode="numeric"
              name="postcode"
              placeholder="123 45"
              defaultValue={postcode}
              ref={register({
                required: { value: true, message: 'Postal code is required' },
                pattern: { value: /[0-9]/, message: 'Only 0-9' }, // TODO: improve validation
              })}
            />
            <span role="alert">{errors?.postcode?.message}</span>
          </form>
        </section>
        <button
          className={s.submitButton}
          form="form"
          type="submit"
          disabled={!canSubmit}
        >
          Continue {productsInCart && <span>{totalCost} SEK</span>}
        </button>
      </Layout>
    </>
  );
};

export default CheckoutPage;
