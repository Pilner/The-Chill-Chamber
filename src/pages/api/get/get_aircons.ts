import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAircons(req: NextApiRequest, res: NextApiResponse) {

	try {
		const client = await pool.connect();
		const aircons = await client.query(`SELECT * FROM aircons`);
		client.release();

		res.json(aircons.rows);
	} catch (error) {
		console.error("Error retrieving aircons:", error);
		res.status(500).json({ error: error });
	}
}