import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const secret = process.env.SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const token = await getToken({ req, secret });
	const session = await getSession({ req });
	console.log('token', token, session);
	if (token) {
		res.json(token);
	} else {
		res.status(401);
	}
	res.end();
};
