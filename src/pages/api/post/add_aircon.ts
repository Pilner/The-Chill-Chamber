import pool from "../../../../db";

import { NextApiRequest, NextApiResponse } from "next";

export default async function AddAircon(req: NextApiRequest, res: NextApiResponse) {
	const { brand, model, type, feature, cspf, star_rating, horsepower, cooling_capacity, price, image_url, description, session } = req.body;

	if (session) {
		try {
			const client = await pool.connect();
			const existCheck = await client.query(`SELECT * FROM aircons WHERE (brand, model) = ($1, $2)`, [brand, model]);

			if (existCheck.rowCount > 0) {
        client.release();
				res.status(409).send("Aircon already exists!");
			} else {

				await client.query(
					`INSERT INTO aircons (brand, model, type, feature, cspf, star_rating, horsepower, cooling_capacity, price, image_url, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11)`, [brand, model, type, feature, parseFloat(cspf), parseInt(star_rating), parseFloat(horsepower), parseInt(cooling_capacity), parseFloat(price), image_url, description]
				);

				console.log("Insert Success");
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
