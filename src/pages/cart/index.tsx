// @ts-nocheck

import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';

import style from '@/styles/Cart.module.css'

import Navbar from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';
import Button from '@/components/Button';
import Line from '@/components/Line';
import CartItem from '@/components/CartItem';

export default function Cart({cartData}) {
	const [cart, setCart] = useState(cartData);
	const router = useRouter();

	let shippingFee = 50;

	const getterFunction = async (model: string) => {
		removeCartItem(model);
	}

	async function removeCartItem(model) {
		const session = await getSession();
		const username = session?.user?.username;
	
		// console.log("test");
	
		try {
			const response = await fetch(`/api/delete/remove_order?username=${username}&model=${model}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			const responseData = await response.text();
			if (response.ok) {
				console.log(responseData);
				// how to redirect after delete?
				alert("Item removed from cart.")
				router.push('/cart');
				
	
			} else if (response.status === 409) {
				// setErrText(`<p>${responseData}</p>`);
			} else if (!response.ok) {
				throw new Error(response.statusText);	
			}
			
		} catch (err) {
			console.error(`Error: ${err}`);
		}
	}
	

  return (
    <>
    <Head>
      <title>TCC | Shopping Cart</title>
    </Head>
    <Navbar />
      <section id={style.cart}>
		<div className="container">
			<div>
				<div className={style.itemSide}>
					<p className="body-title">Shopping Cart</p>
					<div>
						<div className={style.header}>
							<p className={style.picture}>Picture</p>
							<p className={style.model}>Model</p>
							<p className={style.brand}>Brand</p>
							<p className={style.price}>Price</p>
							<p className={style.quantity}>Qty</p>
							<p className={style.totalPrice}>Total</p>
							<p className={style.delete}></p>

						</div>
						{cartData.map((item) => {
							return (<CartItem item={item} key={item.aircon_id} onData={getterFunction} />)
						})}
					</div>
				</div>
				<div className={style.infoSide}>
					<div>
						<p className="body-title">Order Summary</p>
						<div className={style.info}>
							<div>
								<p className="body-text">Subtotal ({cartData.length} item/s):</p>
								<p className='body-text'>Shipping Fee:</p>
								<Line />
								<p className="body-text">Total Cost:</p>
							</div>
							<div>
								<p className="body-text">₱{cartData.reduce((a, b) => a + (parseInt(b.price) * parseInt(b.quantity)), 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
								<p className='body-text'>₱{(shippingFee).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
								<Line />
								<p className="body-text"><b>₱{(cartData.reduce((a, b) => a + (parseInt(b.price) * parseInt(b.quantity)), 0) + shippingFee).toLocaleString(undefined, {minimumFractionDigits: 2})}</b></p>
							</div>
						</div>
						<div>
							{/* <button className={`round-button ${style.checkoutButton}`} onClick={checkoutCart}>Checkout</button> */}
							<Button text="Checkout" url="/cart/billing" />
						</div>

					</div>
				</div>
			</div>
		</div>
      </section>
      <Footer />
    </>
  )
}


async function checkoutCart() {
	const session = await getSession();
	const username = session?.user?.username;

	try {
		const response = await fetch(`/api/post/checkout_cart`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		
		const responseData = await response.text();
		if (response.ok) {
			console.log(responseData);
			alert("Checkout successful.")
			router.push('/cart');
			

		} else if (response.status === 409) {
			// setErrText(`<p>${responseData}</p>`);
		} else if (!response.ok) {
			throw new Error(response.statusText);	
		}
		
	} catch (err) {
		console.error(`Error: ${err}`);
	}
}




export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	const baseURL = `http://${context.req.headers.host}`;

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}

	try {
		const response = await fetch(`${baseURL}/api/get/get_cart?username=${session?.user?.username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const responseData = await response.json();
			return {
				props: {
					cartData: responseData
				}
			}
		}

	} catch (err) {
		console.error(`Error: ${err}`);
	}
}