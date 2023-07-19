// @ts-nocheck

import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/Account.module.css'
import { AccountNavbar } from '@/components/semantics/Navbar';
import { NextApiRequest, NextApiResponse } from 'next';
import Footer from '@/components/semantics/Footer';

import { useRouter } from 'next/router';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';


export default function Account({ admin }: any) {
	const [addMenu, setAddMenu] = useState<ReactElement>();

	useEffect(() => {
		if (admin) {
			setAddMenu(React.createElement(
				Link, {href: "/account/add"},
				React.createElement(
					'div', {},
					React.createElement(
						'p', {className: 'body-title'}, 'Add Item'
						)
					)
				)
			);
		}
	}, [admin])
	
	return (
		<>
		<Head>
		  <title>TCC | Account</title>
		</Head>
		<AccountNavbar />
		<section id={style.accountPage}>
			<div className={`container ${style.container}`}>
				<div>
					<div className={style.left}>
						<Link href="/account/info">
							<div>
								<p className='body-title'>Personal Information</p>
							</div>
						</Link>
						<Link href="/account/change_password">
							<div>
								<p className='body-title'>Change Password</p>
							</div>
						</Link>
						<>
						{addMenu}
						</>
						<Link href="/api/auth/signout">
							<div>
								<p className='body-title'>Sign out</p>
							</div>
						</Link>
					</div>
					<div className={style.right}>
					</div>

				</div>
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
	const baseURL = `http://${context.req.headers.host}`;

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	try {
		let response = await fetch (`${baseURL}/api/get/get_user?username=${session.user.username}`, {
		  	method: 'GET',
		})
	
		if (response.ok) {
		  let user = await response.json();

			if (user.user_type !== 'admin') {
				return {
					props: {
						admin: false,
						user,
						session
					}
				}
			} else {
				return {
					props: {
						admin: true,
						user,
						session
					}
				}
			}
		} else {
		  	throw new Error('Something went wrong');
		}
	} catch (err) {
		console.error(err);
	}



}