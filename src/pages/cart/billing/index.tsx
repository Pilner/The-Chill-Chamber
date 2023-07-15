import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/Billing.module.css'
import Navbar from '@/components/semantics/Navbar';
import { NextApiRequest, NextApiResponse } from 'next';
import Footer from '@/components/semantics/Footer';

import { useRouter } from 'next/router';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';


export default function Billing(req: NextApiRequest, res: NextApiResponse) {
	const [errText, setErrText] = useState('<p></p>');

	const { data: session } = useSession();
	const router = useRouter();

	const handleFormSubmit = async (event: any) => {
		event.preventDefault();
		const full_name = event.target.full_name.value;
		const phone_number = event.target.phone_number.value;
		const area_address = event.target.area_address.value;
		const postal_code = event.target.postal_code.value;
		const home_address = event.target.home_address.value;

		try {
			const response = await fetch('/api/post/checkout', {
				method: 'POST',
				body: JSON.stringify({ full_name, phone_number, area_address, postal_code, home_address, session }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const responseData = await response.json();
			console.log(responseData);
			if (response.ok) {
				router.push('/success');
			} else if (response.status === 409) {
				setErrText(`<p>${responseData}</p>`);
			} else if (!response.ok) {
				throw new Error(response.statusText);	
			}

		} catch (err) {
			console.error(`Error: ${err}`);
		}
	};

	return (
		<>
		<Head>
		  <title>TCC | Register</title>
		</Head>
		<Navbar />
		<section id={style.billingPage}>
		  <div className="container">
			<div className={style.billing}>
			<div className={style.errorText} dangerouslySetInnerHTML={{__html: errText}}></div>
				<p className="body-title">Billing Address</p>
				<form onSubmit={handleFormSubmit}>
					<div className={style.inputsInfo}>
						<p>Contact</p>
						<input className='body-text' type="text" id='full_name' name='full_name' placeholder='Full Name' required />
						<input className='body-text' type="text" id='phone_number' name='phone_number' placeholder='Phone Number' required />
						<p>Address</p>
						<input className='body-text' type="text" id='area_address' name='area_address' placeholder='Region, Province, City, Barangay' required />
						<input className='body-text' type="text" id='postal_code' name='postal_code' placeholder='Postal Code' required />
						<input className='body-text' type="text" id='home_address' name='home_address' placeholder='Street Name, Building, House No.' required />
					</div>
					<div className={style.subLogin}>
					</div>
					<div className={style.regLogin}>
						<button className='round-button' type="submit">
							Place Order
						</button>
					</div>					
				</form>
			</div>
		  </div>
		</section>
		<Footer />
		</>
	  )

}
