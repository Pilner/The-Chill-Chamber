import React, { useEffect, useState, ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/Add.module.css'
import { AccountNavbar } from '@/components/semantics/Navbar';
import { NextApiRequest, NextApiResponse } from 'next';
import Footer from '@/components/semantics/Footer';

import { Router, useRouter } from 'next/router';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';


export default function EditAirconPage({airconData}: any) {
	const [aircon, setAircon] = useState({
		brand: '',
		model: '',
		type: '',
		feature: '',
		cspf: 0,
		star_rating: 0,
		horsepower: 0,
		cooling_capacity: 0,
		price: 0,
		image_url: '',
		description: '',
	});
	const router = useRouter();

	const {data: session} = useSession();
	const [errText, setErrText] = useState<ReactElement>(React.createElement('p'));

	const handleFormSubmit = async (event: any) => {
		event.preventDefault();
		const brand = event.target.brand.value;
		const model = event.target.model.value;
		const type = event.target.type.value;
		const feature = event.target.feature.value;
		const cspf = event.target.cspf.value;
		const star_rating = event.target.starRating.value;
		const horsepower = event.target.horsepower.value;
		const cooling_capacity = event.target.coolingCapacity.value;
		const price = event.target.price.value;
		const image_url = event.target.imageUrl.value;
		const description = event.target.description.value;

		// console.log({brand, model, type, feature, cspf, star_rating, horsepower, cooling_capacity, price, image_url, description});

		try {
			const response = await fetch('/api/post/edit_aircon', {
				method: 'POST',
				body: JSON.stringify({ brand, model, type, feature, cspf, star_rating, horsepower, cooling_capacity, price, image_url, description, session }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const responseData = await response.text();
			if (response.ok) {
				router.push(`/products/${model}`);
        alert("Edit Product Successfully")
			} else if (response.status === 404) {
				setErrText(React.createElement('p', {style: {color:"red"}}, responseData));
			} else if (!response.ok) {
				throw new Error(response.statusText);	
			}

		} catch (err) {
			console.error(`Error: ${err}`);
		}
	};

	
	useEffect(() => {
		setAircon(airconData);
	}, [airconData]);
	// console.log(aircon);

	return (
		<>
		<Head>
		  <title>TCC | Edit Product</title>
		</Head>
		<AccountNavbar />
		<section id={style.addPage}>
			<div className="container">
				<form onSubmit={handleFormSubmit}>
					<div className={style.addForm}>
						<div className={style.formTitle}>
							<div className={style.containerForm}>
								<p className="body-title">Edit Product</p>
							</div>
						</div>
						<div className={style.formInputs}>
							<div className={style.containerForm}>
								<>
								{errText}
								</>
								<div>
									<label htmlFor="brand">Brand:</label>
									<input className='body-text' type="text" id='brand' name='brand' placeholder='Brand' defaultValue={aircon.brand} required />
								</div>
								<div>
									<label htmlFor="model">Model:</label>
									<input className='body-text' type="text" id='model' name='model' placeholder='Model' defaultValue={aircon.model} required />
								</div>
								<div>
									<label htmlFor="cspf">CSPF:</label>
									<input className='body-text' type="number" id='cspf' name='cspf' placeholder='CSPF' min={0} step="0.01" defaultValue={aircon.cspf} required />
								</div>
								<div>
									<label htmlFor="starRating">Star Rating:</label>
									<input className='body-text' type="number" id='starRating' name='starRating' placeholder='Star Rating' min={0} max={5} defaultValue={aircon.star_rating} required />
								</div>
								<div>
									<label htmlFor="type">Type:</label>
									<select className='body-text' id='type' name='type' defaultValue={airconData.type} required>
										<option value="Split Type">Split Type</option>
										<option value="Window Type">Window Type</option>
									</select>
								</div>
								<div>
									<label htmlFor="feature">Feature:</label>
									<select className='body-text' id='feature' name='feature' defaultValue={airconData.feature} required>
										<option value="Inverter">Inverter</option>
										<option value="Non-Inverter">Non-Inverter</option>
									</select>
								</div>
								<div>
									<label htmlFor="horsepower">Horsepower:</label>
									<input className='body-text' type="number" id='horsepower' name='horsepower' placeholder='Horsepower' min={0} step="0.01" defaultValue={aircon.horsepower} required />
								</div>
								<div>
									<label htmlFor="coolingCapacity">Cooling Capacity (kW/h):</label>
									<input className='body-text' type="text" id='coolingCapacity' name='coolingCapacity' placeholder='Cooling Capacity' defaultValue={aircon.cooling_capacity} required />
								</div>
								<div>
									<label htmlFor="price">Price (₱):</label>
									<input className='body-text' type="number" id='price' name='price' placeholder='Price' min={0} step="0.01" defaultValue={aircon.price} required />
								</div>
								<div>
									<label htmlFor="imageUrl">Image URL:</label>
									<input className='body-text' type="text" id='imageUrl' name='imageUrl' placeholder='Image URL' defaultValue={aircon.image_url} required />
								</div>
								<div>
									<label htmlFor="description">Description:</label>
									<textarea className='body-text' id='description' name='description' placeholder='Description' defaultValue={aircon.description} required />
								</div>
							</div>
						</div>
						<div className={style.formSubmit}>
							<div className={style.containerForm}>
								<button className='round-button' type="submit" value="Submit">
									Edit Product
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</section>
		<Footer />
		</>
	  )

}

export async function getServerSideProps(context: any) {
	const providersData = await getProviders();
 	const csrfTokenData = await getCsrfToken(context);
	const {id} = context.params
	const session = await getSession(context);
	const baseURL = `http://${context.req.headers.host}`;


	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	// fetch data from api /api/get/get_aircon
	let airconData = null;
	try {
		const response = await fetch(`${baseURL}/api/get/get_aircon?model=${id}`, {
			method: 'GET',
		});

		if (response.ok) {
			airconData = await response.json();
			console.log(airconData);
		} else {
			throw new Error('Something went wrong');
		}

	} catch (error) {
		console.error(error);
	}


	return {
		props: {
			providersData: providersData,
			csrfTokenData: csrfTokenData,
			airconData: airconData,
		}
	}
}