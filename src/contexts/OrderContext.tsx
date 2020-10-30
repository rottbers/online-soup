import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

import { Order, Product } from '@/types/index';

const initialState: Order = {
  gift: false,
  giftGreeting: '',
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  postcode: '',
  deliveryASAP: true,
  deliveryDate: null,
  products: [],
};

type Event =
  | { type: 'RESET_DETAILS' }
  | { type: 'ADD_PRODUCT'; data: Product }
  | { type: 'INCREMENT_QUANTITY'; data: { id: number } }
  | { type: 'DECREMENT_QUANTITY'; data: { id: number } }
  | { type: 'UPDATE_DETAILS'; data: Partial<Order> };

function reducer(state: Order, event: Event) {
  switch (event.type) {
    case 'ADD_PRODUCT': {
      const { id, quantity } = event.data;
      const products: Product[] = [...state.products];
      const index = products.findIndex((product) => product.id === id);

      index === -1
        ? products.push(event.data)
        : (products[index].quantity = products[index].quantity + quantity);

      return { ...state, products };
    }
    case 'INCREMENT_QUANTITY': {
      const { id } = event.data;
      const products: Product[] = [...state.products];
      const index = products.findIndex((product) => product.id === id);
      const currentQuantity = products[index].quantity;

      if (index !== -1 && currentQuantity < 99) {
        products[index].quantity = currentQuantity + 1;
      }

      return { ...state, products };
    }
    case 'DECREMENT_QUANTITY': {
      const { id } = event.data;
      const products: Product[] = [...state.products];
      const index = products.findIndex((product) => product.id === id);
      const currentQuantity = products[index].quantity;

      if (index !== -1 && currentQuantity !== 1) {
        products[index].quantity = currentQuantity - 1;
      }

      if (currentQuantity === 1) products.splice(index, 1);

      return { ...state, products };
    }
    case 'UPDATE_DETAILS': {
      return { ...state, ...event.data };
    }
    case 'RESET_DETAILS':
      return { ...initialState };
    default:
      return state;
  }
}

interface Context {
  state: Order;
  dispatch: React.Dispatch<Event>;
}

const OrderContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

// prettier-ignore
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (isInitialized) {
      window.localStorage.setItem('order', JSON.stringify(state));
    } else {
      const orderCache = JSON.parse(window.localStorage.getItem('order'));
      dispatch({ type: 'UPDATE_DETAILS', data: { ...initialState, ...orderCache } });
      setIsInitialized(true);
    }
  }, [state, isInitialized]);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = (): Context => useContext(OrderContext);
