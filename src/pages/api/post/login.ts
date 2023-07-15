import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from "../../../db";

import { randomBytes } from 'crypto';


export default async function login(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({error: "Method Not Allowed"});
	}

	const { username, password } = req.body;
	
	try {
		const client = await pool.connect();
	
		const result = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);

		if (result.rowCount === 0) {
			res.status(401).send("Invalid username or password-1" );
		} else {
			const user = result.rows[0];
			const isPasswordValid = await bcrypt.compare(password, user.password_hash);

			if (!isPasswordValid) {
				res.status(401).send("Invalid username or password-2");
			}

			// Authentication Successful
			const sessionToken = generateSessionToken(user.id);
			const expirationDate = new Date(); // Create a new Date object
			
			expirationDate.setDate(expirationDate.getDate() + 7); // Set the expiration to 7 days from the current date

			const formattedExpirationDate = expirationDate.toUTCString();

			localStorage.setItem('sessionToken', sessionToken);

			res.setHeader('Set-Cookie', `sessionToken=${sessionToken}; HttpOnly; Secure; Path=/; Expires=${formattedExpirationDate};`)

			console.log("Authentication Success");
			res.status(200);
			res.redirect("/");
		}
		client.release();
	} catch(err) {
		console.log("test");
		res.status(500).json({ error: `${err}`});
	}
}

// Generate a session token
const generateSessionToken = (length: number): string => {
	const token = randomBytes(length).toString('hex');
	return token;
  };
  