import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getSearchedAircons(req: NextApiRequest, res: NextApiResponse) {

	const { search } = req.query;

	// res.json(req.query);
	
	try {
		const client = await pool.connect();
		const aircons = await client.query(`
			SELECT * FROM aircons
			WHERE brand ILIKE $1
			OR model ILIKE $1
			OR type ILIKE $1
			OR feature ILIKE $1
		`, [`%${search}%`]);
		
		client.release();

		res.json(aircons.rows);
	} catch (error) {
		console.error("Error retrieving aircons:", error);
		res.status(500).json({ error: error });
	}






}

  