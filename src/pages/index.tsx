import Head from 'next/head';
import style from '@/styles/Home.module.css'
import Navbar from "@/components/semantics/Navbar";
import Button from "@/components/Button";
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <>
    <Head>
      <title>The Chill Chamber</title>
    </Head>
      <Navbar />
      <section id={style.front}>
        <div className={`container`}>
          <div className={style.hero}>
            <div>
              <div className={`hero-title`}>
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("The Chill Chamber")
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString("The Cool Comfort")
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString("The Controlled Cold")
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString("The Climate Conditioning")
                      .pauseFor(2500)
                      .deleteAll()
                      .start()
                  }}
                />

              </div>
              <p className={`hero-text`}>for the right price</p>
              <div className={style.buttonDiv}>
                <Button text="SHOP NOW" url="/products" />
                <p className='hero-text'>CHOOSE THE RIGHT AC FOR YOUR HOME</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}




