import Head from 'next/head';
import style from '@/styles/Products.module.css'
import Navbar from '@/components/semantics/Navbar';
import FilterTab from '@/components/semantics/FilterTab';
import Item from '@/components/Item';

export default function index() {
  return (
    <>
    <Head>
      <title>TCC | Products</title>
    </Head>
      <Navbar />
      <section id={style.products}>
        <div className={`container ${style.container}`}>
          <div>
            <FilterTab />
            <div className={style.items}>
              <div>
                <p className='body-title'>Products</p>
                <div className={style.item_container}>
                  <Item brand="LG" model="LA080GC" img="https://www.lg.com/ph/images/residential-air-conditioners/md07567735/gallery1/D-1.jpg" price="25,000" rating={4} />
                  <Item brand="LG" model="LA080GC" img="https://www.lg.com/ph/images/residential-air-conditioners/md07567735/gallery1/D-1.jpg" price="25,000" rating={5} />
                  <Item brand="LG" model="LA080GC" img="https://www.lg.com/ph/images/residential-air-conditioners/md07567735/gallery1/D-1.jpg" price="25,000" rating={4} />
                  <Item brand="LG" model="LA080GC" img="https://www.lg.com/ph/images/residential-air-conditioners/md07567735/gallery1/D-1.jpg" price="25,000" rating={4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const arr = [1,2,3,4,5]