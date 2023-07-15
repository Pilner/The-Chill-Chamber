import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/Login.module.css'
import { LoginNavbar } from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';

import { signIn } from 'next-auth/react';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';


export default function Login() {
	const [errText, setErrText] = useState('');

	const { data: session } = useSession();
	const router = useRouter();

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;
		const rmbPassword = event.target.password.rmbPassword;

		try {
			const result = await signIn('credentials', {
				redirect: false,
				username,
				password
			});

			console.log(result);

			if (!result.error) {
				router.push('/');
			} else {
				console.log(result);
				setErrText(`<p>Invalid username or password</p>`);
			}
		} catch (err) {
			console.error(err);
		}
	}
	
	useEffect(() => {
		if (session) {
			router.push('/');
		}
	})

  return (
    <>
    <Head>
      <title>TCC | Sign in</title>
    </Head>
	<LoginNavbar />
    <section id={style.loginPage}>
      <div className="container">
        <div className={style.login}>
			<div className={style.errorText} dangerouslySetInnerHTML={{__html: errText}}></div>
			<p className="body-title">Sign-in</p>
			<form onSubmit={handleFormSubmit}>
				{/* <input type="hidden" name="csrfToken" value={getCsrfToken} /> */}
				<div className={style.inputsLogin}>
					<input className='body-text' type="text" id='username' name='username' placeholder='Username' required />
					<input className='body-text' type="password" id='password' name='password' placeholder='Password' required />
				</div>
				<div className={style.subLogin}>
					<div>
						<input type="checkbox" name='rmbPassword' id='rmbPassword' />
						<label htmlFor="rmbPassword"> Remember me</label>
					</div>
					<div>
						<Link href="">
							<p className='body-text'>Forgot password?</p>
						</Link>
					</div>
				</div>
				<div className={style.regLogin}>
					<button className='round-button' type="submit">
						Sign In
					</button>
					<p>Not a member? <Link href="/register">Register</Link></p>
				</div>
			</form>
		</div>
      </div>
    </section>
    <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
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