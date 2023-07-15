import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';

export default async function getAircons(req: NextApiRequest, res: NextApiResponse) {

	const { model } = req.query;

	try {
		const client = await pool.connect();
		const aircon = await client.query(`SELECT * FROM aircons WHERE model = $1`, [model]);
		client.release();

		if (aircon.rowCount === 0) {
			res.status(404).send(`${model} does not exist!}`);
		} else {
			res.send(aircon.rows[0]);
		}

	} catch (error) {
		console.error("Error retrieving aircons:", error);
		res.status(500).json({ error: error });
	}
}