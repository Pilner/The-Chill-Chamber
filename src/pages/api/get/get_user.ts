import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';


export default async function getUserInfo(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
    
  // if (session) {
    try {
      const client = await pool.connect();
      const users = await client.query(`SELECT username, user_type FROM users WHERE username = $1`, [username]);
      
      client.release();
  
      res.json(users.rows[0]);
    } catch (error) {
      console.error("Error retrieving personal info:", error);
      res.status(500).json({ test: "error" });
    }
  

  // } else {
  //   res.status(401).json({ error: "You must be signed in to view the protected content on this page." })
  // }

}
