import pool from "../../../../db";

import bcrypt from 'bcrypt';

import { NextApiRequest, NextApiResponse } from "next";
import { useSession, getSession } from 'next-auth/react';


export default async function ChangePassword(req: NextApiRequest, res: NextApiResponse) {

	const { username, password, fname, lname, birthday, gender, session } = req.body;
	
	res.send(session);
	try {
	  const client = await pool.connect();
	  const users = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);
	  let user_id = users.rows[0].user_id;


	  const hashedPassword = await bcrypt.hash(password, 10);

	  const checkValidity = await client.query(`SELECT * FROM personal_info WHERE (first_name, last_name, date_of_birth, gender) = ($1, $2, $3, $4)`, [fname, lname, birthday, gender]);

	  if (checkValidity.rowCount == 0) {
		res.status(404).send("Invalid personal info!");
	  } else {

		  await client.query(
			`UPDATE users SET password_hash = $1 WHERE user_id = $2`, [hashedPassword, user_id]
		  );
		 
		  console.log("Update Success");
	
		  res.status(200);
		  // res.send(personal_info.rows[0]);
		}
		client.release();
  
		res.redirect("/account");
	  
	} catch (error) {
	  console.error("Error retrieving personal info:", error);
	  res.status(500).send("Invalid personal info!");
	}
}
