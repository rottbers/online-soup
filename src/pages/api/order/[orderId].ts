import { NextApiRequest, NextApiResponse } from 'next';
import faunadb from 'faunadb';

import { FullOrder } from '@/types/index';

const secret = process.env.FAUNADB_SECRET;
const client = new faunadb.Client({ secret });

const ordersCollection = process.env.FAUNADB_COLLECTION_ORDERS;
const q = faunadb.query;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { orderId },
    method,
  } = req;

  const documentId = orderId; // TODO: consider security and not using document IDs directly

  const documentRef = q.Ref(q.Collection(ordersCollection), documentId);

  try {
    switch (method) {
      case 'GET': {
        // prettier-ignore
        const { data } = await client.query<{data: FullOrder}>(q.Get(documentRef));
        res.status(200).json(data);
        break;
      }

      // case 'PUT': {
      //   const data: Partial<FullOrder> = body; // TODO: validate data
      //   const dbResponse = await client.query(q.Update(documentRef, { data }));
      //   res.status(200).json(dbResponse);
      //   break;
      // }

      // case 'DELETE': {
      //   const dbResponse = await client.query(q.Delete(documentRef));
      //   res.status(200).json(dbResponse);
      //   break;
      // }

      default: {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch ({ requestResult: { statusCode }, message }) {
    res.status(statusCode ?? 500).json({ message });
  }
};
