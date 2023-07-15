import pool from "../../../../db";

import { NextApiRequest, NextApiResponse } from "next";
import { useSession, getSession } from 'next-auth/react';


export default async function RemoveCartItem(req: NextApiRequest, res: NextApiResponse) {

	const { username, model } = req.query;

	// res.json({ username, model });

	try {
		const client = await pool.connect();

		const users = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);
		let user_id = users.rows[0].user_id;

		const aircons = await client.query(`SELECT * FROM aircons WHERE model = $1`, [model]);
		let aircon_id = aircons.rows[0].aircon_id;

		const cart = await client.query(`SELECT * FROM cart WHERE user_id = $1`, [user_id]);

		if (cart.rowCount > 0) {
			await client.query(`DELETE FROM cart WHERE aircon_id = $1`, [aircon_id]);
		}

		res.status(200).json({ message: "Successfully removed item from cart!" });

		client.release();
	} catch (error) {
		console.error("Error retrieving aircons:", error);
		res.status(500).json({ error: error });

	}  
}
