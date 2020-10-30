type Ingredient = {
  name: string;
};

export interface Product {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  priceSEK: number;
  quantity?: number;
  imageURL?: string;
}

export interface Order {
  gift: boolean;
  giftGreeting?: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  postcode: string;
  deliveryASAP: boolean;
  deliveryDate?: string;
  products: Product[];
}

type OrderStatus = 'pending' | 'processed' | 'enroute' | 'delivered';

export interface FullOrder extends Order {
  orderStatus: OrderStatus;
  orderDate: string;
  orderETA: string;
  deliveryCostSEK: number;
}
