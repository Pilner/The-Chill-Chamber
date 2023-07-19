import Head from 'next/head';
import style from '@/styles/About.module.css'
import Navbar from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';
import Spacer from '@/components/AboutUsSpacer';
import Member from '@/components/AboutUsMember';

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
          <div>
            <div className={style.companyPicture}>
              <Image
                src="/about-us-bg.png"
                width={0}
                height={0}
                style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: "3vmin"}}
                unoptimized={true}
                alt="About us background"
              />
            </div>
            <div className={style.companyText}>
              <div>
                <div className={style.companyName}>
                  <p className='section-title'>The Chill Chamber Company</p>
                </div>
                <div className={style.companyDescription}>
                  <p className={`body-text ${style.bodyText}`}>TCC is a company run by two university students from PUP. It is specifically made to cater to customers that are looking for the right air conditioner appliance for their homes at the most convenient price. We can help them by providing offers based on their needs.</p>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    <Spacer />
    <section id={style.teamInfo}>
      <div className='container'>
        <p className="hero-title">Meet The Team</p>
        <div className={style.memberGroup}>
          <Member url="/ezra-pic.png" role="Web Designer" name="Jose Ezra Nazarane Vergabera" />
          <Member url="/railey-pic.png" role="Full-Stack Developer" name="Fabian Railey Victuelles" />
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}
