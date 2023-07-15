import { NextApiRequest, NextApiResponse } from 'next';
import pool from "../../../../db";

export default async function AddCart(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({error: "Method Not Allowed"});
	}

	const { username, model } = req.body;

	try {
		const client = await pool.connect();
		let user_id, aircon_id, quantity;


		const aircons = await client.query(`SELECT * FROM aircons WHERE model = $1`, [model]);

		if (aircons.rowCount === 0) {
			res.status(404).send("No aircon exists!");
		} else {
			aircon_id = aircons.rows[0].aircon_id;
		}

		const users = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);

		if (users.rowCount === 0) {
			res.status(404).send("No username exists!");
		} else {
			user_id = users.rows[0].user_id;
		}

		// res.json({ user_id, aircon_id });

		const cart = await client.query(`SELECT * FROM cart WHERE user_id = $1 AND aircon_id = $2`, [user_id, aircon_id]);

		if (cart.rowCount > 0) {
			quantity = cart.rows[0].quantity + 1;

			await client.query(`UPDATE cart SET quantity = $1 WHERE user_id = $2 AND aircon_id = $3`, [quantity, user_id, aircon_id]);

		} else {

			await client.query(`INSERT INTO cart (user_id, aircon_id, quantity) VALUES ($1, $2, $3)`, [user_id, aircon_id, 1]);

		}

		res.status(200);

		client.release();
	} catch(err) {
		// Not documented yet
		res.status(409).json({ error: err});

	}
}