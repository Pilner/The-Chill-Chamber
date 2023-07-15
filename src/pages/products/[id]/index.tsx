import Head from 'next/head';
import style from '@/styles/ProductPage.module.css'
import Navbar from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button, { APIButton } from '@/components/Button';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { getSession } from 'next-auth/react';
import { getProviders, getCsrfToken } from 'next-auth/react';


import React, { ReactElement, useEffect, useState } from 'react';


import { useRouter } from 'next/router';

export default function ProductPage({ airconData, response, admin }: any) {

	// console.log(airconData);
	const [editButton, setEditButton] = useState<ReactElement>()

	const getterFunction = async (data: boolean) => {
		addToCart(aircon.model);
		alert('Item added to cart!');
	
	  }	

	const [aircon, setAircon] = useState({
		brand: 'brand',
		model: 'model',
		type: 'type',
		feature: 'feature',
		cspf: 0,
		price: "0",
		horsepower: 0,
		cooling_capacity: "0",
		star_rating: 0,
		description: 'description',
	});


	const router = useRouter();
	const { id } = router.query;
	
	
	useEffect(() => {
		setAircon(airconData);
		if (admin) {
			setEditButton(React.createElement(
				Button, {text: 'Edit', url: `/account/edit/${id}`}
			));
				
		}
		
	}, [airconData, admin])
	let stars = [],
	noStars = [];
	for (let i = 0; i < aircon.star_rating; i++) {
		stars.push(React.createElement(FontAwesomeIcon, { icon: faStar, key: i, style: { color: "#FFD700" } }));
	}
	for (let i = 0; i < 5 - aircon.star_rating; i++) {
		noStars.push(React.createElement(FontAwesomeIcon, { icon: faStar, key: i }));
	}

	let title = `TCC | ${aircon.brand} ${aircon.model}`;
		
  return (
	<>
	<Head>
		{/* <title>TCC | {id}</title> */}
		<title>{title}</title>
	</Head>
	<Navbar />
	<div id={style.productPage}>
		<div className="container">
			<div className={style.main}>
				<div className={style.pictureSide}>
					<div>
						<div className={style.picturePart}>
							<Image
								src={aircon.image_url || '#'}
								width={0}
								height={0}
								style={{height: "100%", width: "100%", objectFit: "contain"}}
								unoptimized={true}
								alt={`Picture of ${aircon.model}` || "Product Picture"}
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
									<td><p>{aircon.type}</p></td>
								</tr>
								<tr>
									<th><p className='hero-text'><b>Feature:</b></p></th>
									<td><p>{aircon.feature}</p></td>
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
						<div className={style.cartButton}>
							<>
							{editButton}
							</>
							<APIButton text='Add to cart' onData={getterFunction} />
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
	</>
  )
}

async function addToCart(model: string) {
	const session = await getSession();
	
	// console.log(session);
	const username = session?.user?.username;
	let data = {model, username};
  
	try {
	  const response = await fetch('/api/post/add_cart', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	  });
	
	  const responseData = await response.json();
	  console.log(responseData);
	  if (response.ok) {
	  } else if (response.status === 409) {
		throw new Error(responseData);
	  } else if (!response.ok) {
		throw new Error(response.statusText);
	  }
  
	} catch(err) {
	  console.error(err);
	}
}


export async function getServerSideProps(context: any) {
	const providersData = await getProviders();
	const csrfTokenData = await getCsrfToken(context);
	const session = await getSession(context);
	const {params} = context;
	const {id} = params;	
	
	// console.log(id);
	
	try {
		const [response1, response2] = await Promise.all([
			fetch (`${process.env.URL}/api/get/get_aircon?model=${id}`, {
				method: 'GET'
			}),

			fetch (`${process.env.URL}/api/get/get_user?username=${session?.user?.username}`, {
					method: 'GET',
			})
		]);



		// console.log(`${process.env.URL}/api/get/get_aircon?model=${id}`);
		// console.log(`${process.env.URL}/api/get/get_user?username=${session?.user?.username}`);

		if (response1.ok && response2.ok) {
			let airconData = await response1.json();
			let user = await response2.json();


			if (user.user_type !== 'admin') {
				return {
					props: {
						airconData,
						admin: false,
						user,
						session
					}
				}

			} else {
				return {
					props: {
						airconData,
						admin: true,
						user,
						session
					}
				}
			}
				// return {
				// 	props: {
				// 		airconData,
				// 	}
				// }

		} else {
			throw new Error(`${response1.status} ${response1.statusText}`);
		}
		
	} catch (err) {
		console.error(`${err}`);
		return {
			props: {
				airconData: {},
				admin: false,
				user: {},
				session: null
	}
		}
	}
}