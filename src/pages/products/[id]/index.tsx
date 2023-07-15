import Head from 'next/head';
import style from '@/styles/ProductPage.module.css'
import Navbar from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NextApiRequest, NextApiResponse } from 'next';


import React, { useEffect } from 'react';


import { useRouter } from 'next/router';

export default function ProductPage({ airconData }) {

	const [aircon, setAircon] = React.useState({
		brand: 'brand',
		model: 'model',
		type: 'type',
		feature: 'feature',
		cspf: 0,
		price: 0,
		horsepower: 0,
		cooling_capacity: 0,
		star_rating: 0,
		description: 'description',
		image_url: 'image_url'		
	});

	const router = useRouter();
	const { id } = router.query;
	
	
	useEffect(() => {
		
		setAircon(airconData);
		
	})
	let stars = [],
	noStars = [];
	for (let i = 0; i < aircon.star_rating; i++) {
		stars.push(React.createElement(FontAwesomeIcon, { icon: faStar, key: i, style: { color: "#FFD700" } }));
	}
	for (let i = 0; i < 5 - aircon.star_rating; i++) {
		noStars.push(React.createElement(FontAwesomeIcon, { icon: faStar, key: i }));
	}
		
  return (
	<>
	<Head>
		<title>TCC | {aircon.model}</title>
	</Head>
	<Navbar />
	<div id={style.productPage}>
		<div className="container">
			<div className={style.main}>
				<div className={style.pictureSide}>
					<div>
						<div className={style.picturePart}>
							<Image
								src={aircon.image_url}
								width={0}
								height={0}
								style={{height: "100%", width: "100%", objectFit: "contain"}}
								unoptimized={true}
								alt="Product Picture"
							/>
						</div>
						<div className={style.captionPart}>
							<p className='body-title'>Picture Sample</p>
						</div>
					</div>
				</div>
				<div className={style.infoSide}>
					<div>
						<div>
							<p className={`${style.itemTitle}`}>{`${aircon.brand} ${aircon.model}`}</p>
							<p className={style.itemText}>{aircon.description}</p>
						</div>
						<table>
							<tbody>
								<tr>
									<th><p className='hero-text'><b>Brand:</b></p></th>
									<td><p>{aircon.brand}</p></td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>Model:</b></p></th>
									<td><p>{aircon.model}</p></td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>Type:</b></p></th>
									<td><p>{capitalize(aircon.type)} Type</p></td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>Feature:</b></p></th>
									<td><p>{capitalize(aircon.feature)}</p></td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>CSPF:</b></p></th>
									<td><p>{aircon.cspf}</p></td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>Star Rating:</b></p></th>
									<td>
										{stars.map((star) => {
											return star;
										})}

										{noStars.map((star) => {
											return star;
										})}
									</td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>Horsepower:</b></p></th>
									<td><p>{aircon.horsepower} HP</p></td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>Cooling Capacity:</b></p></th>
									<td><p>{parseInt(aircon.cooling_capacity).toLocaleString()} kJ/h</p></td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>Price:</b></p></th>
									<td><p>₱{parseInt(aircon.price).toLocaleString(undefined, {minimumFractionDigits: 2})}</p></td>
								</tr>

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
	</>
  )
}

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}


export async function getServerSideProps({ params }) {

	const id = params.id;

	try {
		let response = await fetch (`${process.env.URL}/api/get/get_aircon?model=${id}`, {
			method: 'GET'
		})
		
		if (response.ok) {
			let airconData = await response.json();
			return { props: { airconData } }
		} else {
			throw new Error('Something went wrong');
		}
		
	} catch (err) {
		console.error(err);
	}

}
