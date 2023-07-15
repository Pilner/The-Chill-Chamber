import Head from 'next/head';
import { getSession } from 'next-auth/react';

import style from '@/styles/Success.module.css'

import Button from '@/components/Button'
import Navbar from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';

export default function Success({orderInfo}) {

	return (
    <>
    <Head>
      <title>TCC | Success</title>
    </Head>
    <Navbar />
      <section id={style.successPage}>
        <div className='container'>
			<div>
				<p className='body-title'>Success!</p>
				<p className='body-text'>Your order has been placed.</p>
				<p className="body-text">Order ID: {orderInfo.order_id}</p>
				<Button text="Shop More!" url="/" />
			</div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}

	try {
		const response = await fetch(`${process.env.URL}/api/get/get_order_info?username=${session?.user?.username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		
		if (response.ok) {
			const responseData = await response.json();
			return {
				props: {
					orderInfo: responseData
				}
			}
		}

	} catch (err) {
		console.error(`Error: ${err}`);
	}
}