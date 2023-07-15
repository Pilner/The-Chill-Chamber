import pool from "../../../../db";

import { NextApiRequest, NextApiResponse } from "next";

export default async function EditAircon(req: NextApiRequest, res: NextApiResponse) {
	const { brand, model, type, feature, cspf, star_rating, horsepower, cooling_capacity, price, image_url, description, session } = req.body;

	// res.json({ brand, model, type, feature, cspf, star_rating, horsepower, cooling_capacity, price, image_url, description, session });

	if (session) {
		try {
			const client = await pool.connect();
			const existCheck = await client.query(`SELECT * FROM aircons WHERE (brand, model) = ($1, $2)`, [brand, model]);

			
			if (existCheck.rowCount === 0) {
				client.release();
				res.status(404).send("No aircon exists!");
			} else {
				let aircon_id = existCheck.rows[0].aircon_id;

				await client.query(`
				UPDATE aircons
				SET brand = $1,
					model = $2,
					type = $3,
					feature = $4,
					cspf = $5,
					star_rating = $6,
					horsepower = $7,
					cooling_capacity = $8,
					price = $9,
					image_url = $10,
					description = $11
				WHERE aircon_id = $12
				`, [brand, model, type, feature, parseFloat(cspf), parseInt(star_rating), parseFloat(horsepower), parseInt(cooling_capacity), parseFloat(price), image_url, description, aircon_id]
				);

				console.log("Update Success");
				res.status(200);
				res.redirect("/products");
        		client.release();

			}
		} catch (err) {
			// Not documented yet
			res.status(409).json({ error: `${err}` });

		}
	}
}
