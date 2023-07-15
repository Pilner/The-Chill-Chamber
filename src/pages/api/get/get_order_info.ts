import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';

export default async function getOrder(req: NextApiRequest, res: NextApiResponse) {

	const { username } = req.query;
	try {
		const client = await pool.connect();
		const user = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);
		
		let user_id = user.rows[0].user_id;
		
		const order = await client.query(`SELECT * FROM orders where user_id = $1`, [user_id]);
		
		// res.json(order);
		res.json(order.rows[order.rowCount - 1]);

		client.release();

		// res.json(aircon.rows[0]);
	} catch (error) {
		console.error("Error retrieving order:", error);
		res.status(500).json({ error: error });
	}
}