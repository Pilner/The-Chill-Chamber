import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/Account.module.css'
import { AccountNavbar } from '@/components/semantics/Navbar';
import { NextApiRequest, NextApiResponse } from 'next';
import Footer from '@/components/semantics/Footer';

import { useRouter } from 'next/router';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';


export default function ChangePassword({ admin }) {
	const {data: session} = useSession();
	const [addMenu, setAddMenu] = useState<ReactElement>();
	const [errText, setErrText] = useState('<p></p>');

	const handleFormSubmit = async (event: any) => {
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;
		const fname = event.target.fname.value;
		const lname = event.target.lname.value;
		const birthday = event.target.birthday.value;
		const gender = event.target.gender.value;

		try {
			const response = await fetch('/api/post/change_password', {
				method: 'POST',
				body: JSON.stringify({ username, password, fname, lname, birthday, gender, session }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const responseData = await response.text();
			if (response.ok) {
				window.location.href = '/account';
        alert("Changed Password Successfully")
			} else if (response.status === 409) {
				setErrText(`<p>${responseData}</p>`);
			} else if (!response.ok) {
				throw new Error(response.statusText);	
			}

		} catch (err) {
			console.error(`Error: ${err}`);
		}
	};

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
							<div className={style.active}>
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
					<section id={style.loginPage}>
						<div className="container">
							<div className={style.login}>
							<div className={style.errorText} dangerouslySetInnerHTML={{__html: errText}}></div>
								<p className="body-title">Change Password</p>
								<form onSubmit={handleFormSubmit}>
									<div className={style.inputsLogin}>
										<input className='body-text' type="text" id='username' name='username' placeholder='Username' required />
										<input className='body-text' type="text" id='fname' name='fname' placeholder='First Name' required />
										<input className='body-text' type="text" id='lname' name='lname' placeholder='Last Name' required />
										<input className='body-text' type="password" id='password' name='password' placeholder='Password' required />
										<div className={style.additionalLogin}>
											<div>
												<label htmlFor="birthday">
													<p className='body-text'>Birthday</p>
												</label>
												<input className='body-text' type="date" id='birthday' name='birthday' required />
											</div>

											<div>
											<div>
												<label htmlFor="gender">
													<p className='body-text'>Gender</p>
												</label>
												<select className='body-text' id='gender' name='gender' required>
													<option value="Male">Male</option>
													<option value="Female">Female</option>
												</select>								
											</div>

											</div>
										</div>
									</div>
									<div className={style.subLogin}>
										<div>
										</div>
										<div></div>
									</div>
									<div className={style.regLogin}>
										<button className='round-button' type="submit">
											Change Password
										</button>
									</div>					
								</form>
							</div>
						</div>
						</section>

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

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	try {
		let response = await fetch (`${process.env.URL}/api/get/get_user?username=${session.user.username}`, {
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
