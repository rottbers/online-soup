import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const { amount } = body; // TODO: calc amount server side

    const { client_secret } = await stripe.paymentIntents.create({
      amount,
      currency: 'sek',
      metadata: { integration_check: 'accept_a_payment' },
    });

    res.status(200).json({ clientSecret: client_secret });
  } catch ({ statusCode, message }) {
    res.status(statusCode ?? 500).json({ message });
  }
};
