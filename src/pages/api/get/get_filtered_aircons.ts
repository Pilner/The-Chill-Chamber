
// @ts-nocheck

import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getFilteredAircons(req: NextApiRequest, res: NextApiResponse) {

	const { min_price, max_price, type, feature, horsepower, min_star, max_star } = req.query;

	// res.json(req.query);

	const { query, params } = generateQuery(min_price, max_price, type, feature, horsepower, min_star, max_star);

	// res.json({query, params});
	
	if (params.length == 0) {

		try {
			const client = await pool.connect();
			const aircons = await client.query(`SELECT * FROM aircons`);
			client.release();
	
			res.json(aircons.rows);
		} catch (error) {
			console.error("Error retrieving aircons:", error);
			res.status(500).json({ error: error });
		}
	
	} else {

		try {
			const client = await pool.connect();
			const aircons = await client.query(query, [...params]);
			// const aircons = await client.query(`select * from aircons where type = $1`, [type]);
			client.release();
	
			res.json(aircons.rows);
		} catch (error) {
			console.error("Error retrieving aircons:", error);
			res.status(500).json({ error: error });
		}
	}
}

const generateQuery = (minPrice, maxPrice, type, feature, horsepower, minStar, maxStar) => {
	let query = `SELECT * FROM aircons WHERE `;
  
	const conditions = [];
	const params = [];
  
	let paramIndex = 1;
  
	if ((minPrice !== undefined && minPrice !== '') || (maxPrice !== undefined && maxPrice !== '')) {
		if ((minPrice !== undefined || minPrice !== '') && (maxPrice === undefined || maxPrice == '')) {
			conditions.push(`price >= $${paramIndex}`);
			params.push(minPrice);
			paramIndex++;	  
		} else if ((maxPrice !== undefined || maxPrice !== '') && (minPrice === undefined || minPrice == '')) {
			conditions.push(`price <= $${paramIndex}`);
			params.push(maxPrice);
			paramIndex++;	  
		} else {
			conditions.push(`price BETWEEN $${paramIndex} AND $${paramIndex + 1}`);
			params.push(minPrice, maxPrice);
			paramIndex += 2;

		}
	}
  
	if (type !== undefined && type !== 'any') {
	  conditions.push(`type = $${paramIndex}`);
	  params.push(type);
	  paramIndex++;
	}
  
	if (feature !== undefined && feature !== 'any') {
	  conditions.push(`feature = $${paramIndex}`);
	  params.push(feature);
	  paramIndex++;
	}
  
	if (horsepower !== undefined && horsepower !== 'any') {
	  conditions.push(`horsepower <= $${paramIndex}`);
	  params.push(horsepower);
	  paramIndex++;
	}
  
	if ((minStar !== undefined && minStar !== '') || (maxStar !== undefined && maxStar !== '')) {

		if ((minStar !== undefined || minStar !== '') && (maxStar === undefined || maxStar === '')) {
			conditions.push(`star_rating >= $${paramIndex}`);
			params.push(minStar);
			paramIndex++;	  
		} else if ((maxStar !== undefined || maxStar !== '') && (minStar === undefined || minStar == '')) {
			conditions.push(`star_rating <= $${paramIndex}`);
			params.push(maxStar);
			paramIndex++;	  
		} else {
			conditions.push(`star_rating BETWEEN $${paramIndex} AND $${paramIndex + 1}`);
			params.push(minStar, maxStar);
			paramIndex += 2;
		}
	}
  
	query += conditions.join(' AND ');
  
	return {
	  query,
	  params,
	};
  };
  