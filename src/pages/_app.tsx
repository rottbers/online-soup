import { AppProps } from 'next/app';

import 'normalize.css/normalize.css';
import 'fontsource-quicksand/index.css';
import '../styles/global.scss';

import { OrderProvider } from '@/contexts/OrderContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <OrderProvider>
    <Component {...pageProps} />
  </OrderProvider>
);

export default MyApp;
