import Head from 'next/head';
import style from '@/styles/ProductPage.module.css'
import Navbar from '@/components/semantics/Navbar';
import Image from 'next/image';

import { useRouter } from 'next/router';

export default function ProductPage() {
	const router = useRouter();
	const { id } = router.query;
	console.log(id);

  return (
	<>
	<Head>
		<title>TCC | Item</title>
	</Head>
	<Navbar />
	<section id={style.productPage}>
		<div className="container">
			<div className={style.main}>
				<div className={style.pictureSide}>
					<Image
						src={`https://www.lg.com/ph/images/residential-air-conditioners/md07567735/gallery1/D-1.jpg`}
						width={0}
						height={0}
						style={{height:"100%", width:"100%", objectFit:"contain"}}
						unoptimized={true}
						alt='Product Picture'
					/>
				</div>
				<div className={style.infoSide}>
					<p className="hero-title">{id}</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
					<p className='hero-text'>idol</p>
				</div>
			</div>
		</div>
	</section>
	</>
  )
}
