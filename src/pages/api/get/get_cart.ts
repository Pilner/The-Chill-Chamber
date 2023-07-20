import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';

export default async function getAircons(req: NextApiRequest, res: NextApiResponse) {

	const session = await getSession({ req });

	const { username } = req.query;
	let aircons = [];
	let user_id;

	try {
		const client = await pool.connect();

		const users = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);

		if (users.rowCount === 0) {
			res.status(404).send("No username exists!");
		} else {
			user_id = users.rows[0].user_id;
		}
		
		const cart = await client.query(`SELECT * FROM cart WHERE user_id = $1`, [user_id]);
		
		for (let i = 0; i < cart.rowCount; i++) {
			const aircon = await client.query(`SELECT * FROM aircons WHERE aircon_id = $1`, [cart.rows[i].aircon_id]);
			aircon.rows[0].quantity = cart.rows[i].quantity;
			aircons.push(aircon.rows[0]);
		}

		res.json(aircons);
		client.release();
	} catch (error) {
		console.error("Error retrieving aircons:", error);
		res.status(500).json({ error: error });
	}
}