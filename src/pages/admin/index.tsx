import Head from 'next/head';
import style from '@/styles/Admin.module.css'
import Navbar from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';

export default function Admin() {
  return (
	<>
	<Head>
		<title>TCC | Admin</title>
	</Head>
	<Navbar />
	<section id={style.adminPage}>
		<div className="container">
			
		</div>
	</section>
	<Footer />
	</>
  )
}
