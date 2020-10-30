import { Product } from '@/types/index';

export function generateSlug(id: string | number, productName: string): string {
  return `${id}-${productName.split(' ').join('-').toLowerCase()}`;
}

export function parseIdFromSlug(slug: string): number {
  return Number(slug.split('-')[0]);
}

export function calcCartQuantity(array: Product[]): number {
  return array.reduce((acc, { quantity }) => acc + quantity, 0);
}

export function calcCartProductsCost(array: Product[]): number {
  return array.reduce(
    (acc, { quantity, priceSEK }) => acc + priceSEK * quantity,
    0
  );
}

export async function post<T = unknown>(
  url: string,
  body: unknown
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw Error(`${response.status}: ${response.statusText}`);
  const data = await response.json();
  return data;
}
