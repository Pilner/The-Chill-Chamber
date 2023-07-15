import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import pool from "../../../../db";

export default async function Checkout(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({error: "Method Not Allowed"});
	}

	let user_id, shippingFee = 50, total_amount = 0, aircons = [];

	const { full_name, phone_number, area_address, postal_code, home_address, session } = req.body;

	// res.json({full_name, phone_number, area_address, postal_code, home_address});
	// res.json({session});

	try {
		const client = await pool.connect();

		const users = await client.query(`SELECT * FROM users WHERE username = $1`, [session?.user?.username]);

		if (users.rowCount === 0) {
			res.status(404).send("No username exists!");
		} else {
			user_id = users.rows[0].user_id;
		}
		
		const cart = await client.query(`SELECT * FROM cart WHERE user_id = $1`, [user_id]);
		
		for (let i = 0; i < cart.rowCount; i++) {
			let aircon = await client.query(`SELECT * FROM aircons WHERE aircon_id = $1`, [cart.rows[i].aircon_id]);
			let airconWithQuantity = { ...aircon.rows[0], quantity: cart.rows[i].quantity };
			aircons.push(airconWithQuantity);
			total_amount += airconWithQuantity.price * cart.rows[i].quantity;
		}

		//  res.json("test");
		

		const orders = await client.query(`INSERT INTO orders (user_id, total_amount, shipping_fee) VALUES ($1, $2, $3) RETURNING order_id`, [user_id, total_amount, shippingFee]);

		let order_id = orders.rows[0].order_id;

		for (let i = 0; i < aircons.length; i++) {
			await client.query(`INSERT INTO order_items (order_id, aircon_id, quantity, price) VALUES ($1, $2, $3, $4)`, [order_id, aircons[i].aircon_id, aircons[i].quantity, aircons[i].price]);
		};

		await client.query(`INSERT INTO billing_info (user_id, order_id, full_name, phone_number, area_address, postal_code, home_address) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [user_id, order_id, full_name, phone_number, area_address, postal_code, home_address]);

		await client.query(`DELETE FROM cart WHERE user_id = $1`, [user_id]);

		res.status(200).json("Order Placed Successfully");

		client.release();
	} catch(err) {
		// Not documented yet
		res.json({ error: err});

	}
}