import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';


export default async function getPersonalInfo(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
    
  // if (session) {
    try {
      const client = await pool.connect();
      const users = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);
      let user_id = users.rows[0].user_id;
      
      const personal_info = await client.query(`SELECT * FROM personal_info WHERE user_id = $1`, [user_id]);
      client.release();
  
      res.json(personal_info.rows[0]);
    } catch (error) {
      console.error("Error retrieving personal info:", error);
      res.status(500).json({ test: "error" });
    }
  

  // } else {
  //   res.status(401).json({ error: "You must be signed in to view the protected content on this page." })
  // }

}
