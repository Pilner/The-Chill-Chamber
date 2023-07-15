import Head from 'next/head';
import Link from 'next/link';


import style from '@/styles/Contact.module.css'
import Navbar from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';

export default function Contact() {

  return (
    <>
    <Head>
      <title>TCC | Contact</title>
    </Head>
	<Navbar />
    <section id={style.contactPage}>
      <div className="container">
        <div className={style.contact}>
			<p className="body-title">Contact Us</p>
			<form>
				<div className={style.inputsContact}>
					<input className='body-text' type="text" id='name' name='name' placeholder='Name' required />
					<input className='body-text' type="email" id='email' name='email' placeholder='Email' required />
					<input className='body-text' type="text" id='phone' name='phone' placeholder='Phone' required />
					<textarea className='body-text' name="detail" id="detail" placeholder='Details'></textarea>
				</div>
				<div className={style.regLogin}>
					<button className='round-button' type="submit">
						Contact
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
