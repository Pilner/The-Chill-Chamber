import Head from 'next/head';
import style from '@/styles/About.module.css'
import Navbar from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';

import Image from 'next/image';

export default function About() {
  return (
    <>
    <Head>
      <title>TCC | About Us</title>
    </Head>
    <Navbar />
    <section id={style.aboutPage}>
      <div className="container">
        <div id={style.companyInfo}>
          {/* <Image
            src="/about-us-bg.png"
            width={0}
            height={0}
            style={{width: '100%', height: '100%'}}
            unoptimized={true}
            alt="About us background"
            /> */}

            <div className={style.companyText}>
              <p className='section-title'>The Chill Chamber Company</p>
              <p>TCC is a company run by two university students from PUP. It is specifically made to cater to customers that are looking for the right air conditioner appliance for their homes at the most convenient price. We can help them by providing offers based on their needs.</p>
            </div>
        </div>
        
      </div>
    </section>
    <Footer />
    </>
  )
}
