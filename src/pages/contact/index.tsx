import Head from 'next/head';
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
	<section id={style.contactPage}></section>
	<Footer />
	</>

  )
}
