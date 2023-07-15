import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/forgotPassword.module.css'
import { LoginNavbar } from '@/components/semantics/Navbar';
import { NextApiRequest, NextApiResponse } from 'next';
import Footer from '@/components/semantics/Footer';

import { Router, useRouter } from 'next/router';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { getSession } from 'next-auth/react';


export default function ForgotPassword() {
	const router = useRouter();
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
				body: JSON.stringify({ username, password, fname, lname, birthday, gender}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const responseData = await response.text();
			if (response.ok) {
				router.push('/login')
        		alert("Changed Password Successfully")
			} else if (!response.ok) {
				setErrText(`<p>${responseData}</p>`);
				throw new Error(response.statusText);	
			}

		} catch (err) {
			console.error(`Error: ${err}`);
		}
	};
	
	return (
		<>
		<Head>
		  <title>TCC | Forgot Password</title>
		</Head>
		<LoginNavbar />
		<section id={style.forgotPassPage}>
			<div className={`container ${style.container}`}>
				<div>
					<div className={style.loginForm}>
					<section id={style.loginPage}>
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

	if (session) {
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
