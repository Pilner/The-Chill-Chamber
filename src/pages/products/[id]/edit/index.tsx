import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/Add.module.css'
import { AccountNavbar } from '@/components/semantics/Navbar';
import { NextApiRequest, NextApiResponse } from 'next';
import Footer from '@/components/semantics/Footer';

import { useRouter } from 'next/router';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';


export default function Edit() {

	return (
		<>
		<Head>
		  <title>TCC | Edit Product</title>
		</Head>
		<AccountNavbar />
		<section id={style.addPage}>
			<div className="container">
				<form action="/api/add" method="POST">
					<div className={style.addForm}>
						<div className={style.formTitle}>
							<div className={style.containerForm}>
								<p className="body-title">Edit Product</p>
							</div>
						</div>
						<div className={style.formInputs}>
							<div className={style.containerForm}>
								<div>
									<label htmlFor="brand">Brand:</label>
									<input className='body-text' type="text" id='brand' name='brand' placeholder='Brand' required />
								</div>
								<div>
									<label htmlFor="model">Model:</label>
									<input className='body-text' type="text" id='model' name='model' placeholder='Model' required />
								</div>
								<div>
									<label htmlFor="cspf">CSPF:</label>
									<input className='body-text' type="number" id='cspf' name='cspf' placeholder='CSPF' min={0} step="0.01" required />
								</div>
								<div>
									<label htmlFor="starRating">Star Rating:</label>
									<input className='body-text' type="number" id='starRating' name='starRating' placeholder='Star Rating' min={0} max={5} required />
								</div>
								<div>
									<label htmlFor="type">Type:</label>
									<select className='body-text' id='type' name='type' required>
										<option value="split">Split Type</option>
										<option value="window">Window Type</option>
									</select>
								</div>
								<div>
									<label htmlFor="feature">Feature:</label>
									<select className='body-text' id='feature' name='feature' required>
										<option value="inverter">Inverter</option>
										<option value="non-inverter">Non-Inverter</option>
									</select>
								</div>
								<div>
									<label htmlFor="horsepower">Horsepower:</label>
									<input className='body-text' type="number" id='horsepower' name='horsepower' placeholder='Horsepower' min={0} step="0.01" required />
								</div>
								<div>
									<label htmlFor="coolingCapacity">Cooling Capacity (kW/h):</label>
									<input className='body-text' type="text" id='coolingCapacity' name='coolingCapacity' placeholder='Cooling Capacity' required />
								</div>
								<div>
									<label htmlFor="price">Price (₱):</label>
									<input className='body-text' type="number" id='price' name='price' placeholder='Price' min={0} step="0.01" required />
								</div>
								<div>
									<label htmlFor="imageUrl">Image URL:</label>
									<input className='body-text' type="text" id='imageUrl' name='imageUrl' placeholder='Image URL' required />
								</div>
								<div>
									<label htmlFor="description">Description:</label>
									<textarea className='body-text' id='description' name='description' placeholder='Description' required />
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
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}


	return {
		props: {
			providersData: providersData,
			csrfTokenData: csrfTokenData
		}
	}
}