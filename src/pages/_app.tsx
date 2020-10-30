import { AppProps } from 'next/app';
import Head from 'next/head';

import 'normalize.css/normalize.css';
import 'fontsource-quicksand/index.css';
import '../styles/global.scss';

import { OrderProvider } from '@/contexts/OrderContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="manifest" href="/manifest.webmanifest" key="manifest" />
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180x180.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
    </Head>
    <OrderProvider>
      <Component {...pageProps} />
    </OrderProvider>
  </>
);

export default MyApp;
