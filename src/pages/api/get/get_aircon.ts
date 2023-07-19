import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';

export default async function getAircons(req: NextApiRequest, res: NextApiResponse) {

	const { aircon_id } = req.query;

	try {
		const client = await pool.connect();
		const aircon = await client.query(`SELECT * FROM aircons WHERE aircon_id = $1`, [aircon_id]);
		client.release();

		if (aircon.rowCount === 0) {
			res.status(404).send(`${aircon_id} does not exist!}`);
		} else {
			res.send(aircon.rows[0]);
		}

	} catch (error) {
		console.error("Error retrieving aircons:", error);
		res.status(500).json({ error: error });
	}
}