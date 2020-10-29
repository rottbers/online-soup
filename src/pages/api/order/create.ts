import { NextApiRequest, NextApiResponse } from 'next';
import faunadb from 'faunadb';

import { FullOrder, Order } from '@/types/index';

const secret = process.env.FAUNADB_SECRET;
const client = new faunadb.Client({ secret });

const ordersCollection = process.env.FAUNADB_COLLECTION_ORDERS;
const q = faunadb.query;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  const clientData: Order = body; // TODO: validate client data

  const data: FullOrder = {
    orderStatus: 'pending',
    orderDate: new Date().toISOString(),
    orderETA: '',
    deliveryCostSEK: 39,
    ...clientData,
  };

  const collection = q.Collection(ordersCollection);

  try {
    const dbResponse = await client.query(q.Create(collection, { data }));

    // @ts-expect-error ...
    const orderId = dbResponse.ref.id; // TODO: consider security and not using document IDs directly

    res.status(200).json({ orderId });
  } catch ({ requestResult: { statusCode }, message }) {
    res.status(statusCode ?? 500).json({ message });
  }
};
