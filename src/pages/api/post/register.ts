import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from "../../../../db";

export default async function Register(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({error: "Method Not Allowed"});
	}

	const { username, password, fname, lname, birthday, gender } = req.body;

	let today = new Date(),
		birthDate = new Date(birthday),
		age = today.getFullYear() - birthDate.getFullYear();

	

	try {
		const client = await pool.connect();

		const result = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);

		if (result.rowCount > 0) {
			res.status(409).send("Username already exists!");
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
	
			await client.query(
				`INSERT INTO users (username, password_hash) VALUES ($1, $2)`, [username, hashedPassword]
			);

			const users = await client.query(
				`SELECT * FROM users WHERE username = $1`, [username]
			);
			let user_id = users.rows[0].user_id;

			await client.query(
				`INSERT INTO personal_info (user_id, first_name, last_name, date_of_birth, gender) VALUES ($1, $2, $3, $4, $5)`, [user_id, fname, lname, birthday, gender]
			);

			console.log("Insert Success");
			res.status(200);
			res.redirect("/login");
		}

		client.release();
	} catch(err) {
		// Not documented yet
		res.status(409).json({ error: `${err}`});

	}
}