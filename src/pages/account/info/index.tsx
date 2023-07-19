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


export default function Account({personalInfo, admin}) {
	const [addMenu, setAddMenu] = useState<ReactElement>();

	const [info, setInfo] = useState({
		first_name: '',
		last_name: '',
		date_of_birth: '',
		gender: ''
	});
	const {data: session} = useSession();

	useEffect(() => {
		setInfo(personalInfo);

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

	}, [personalInfo, admin]);
	
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
							<div className={style.active}>
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
						<div className={style.infoTable}>
							<table>
								<tbody>
									<tr>
										<th><p>Username: </p></th>
										<td><p>{session?.user.username}</p></td>
									</tr>
									<tr>
										<th><p>First Name: </p></th>
										<td><p>{info.first_name}</p></td>
									</tr>
									<tr>
										<th><p>Last Name: </p></th>
										<td><p>{info.last_name}</p></td>
									</tr>
									<tr>
										<th><p>Date of Birth: </p></th>
										<td><p>{new Date(info.date_of_birth).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p></td>
									</tr>
									<tr>
										<th><p>Gender: </p></th>
										<td><p>{info.gender}</p></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

				</div>
			</div>
		</section>
		<Footer />
		</>
	  )

}


export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	const baseURL = `http://${context.req.headers.host}`;

	let personalInfo;

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	try {
		let response = await fetch (`${process.env.URL}/api/get/get_personal_info?username=${session.user.username}`, {
		  method: 'GET',
		})
	
		if (response.ok) {
		  personalInfo = await response.json();
		} else {
		  throw new Error('Something went wrong');
		}
	
	  } catch (err) {
		console.error(err);
		return { props: {err} }
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
						session,
						personalInfo
					}
				}
			} else {
				return {
					props: {
						admin: true,
						user,
						session,
						personalInfo
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
