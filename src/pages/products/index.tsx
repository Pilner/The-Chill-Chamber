import Head from 'next/head';
import { useEffect, useState } from 'react';

import style from '@/styles/Products.module.css'

import { ProductNavbar } from '@/components/semantics/Navbar';
import Footer from '@/components/semantics/Footer';
import FilterTab from '@/components/FilterTab';
import Item from '@/components/Item';

export default function Product({airconsData}) {
  const [aircons, setAircons] = useState([]);  

  const filterAircons = async (data) => {
    const filteredAircons = await getFilteredAircons(data);
    setAircons(filteredAircons);
  }

  const searchAircons = async (data) => {
    const searchedAircons = await getSearchedAircons(data);
    setAircons(searchedAircons);
  }
  
  useEffect(() => {
    setAircons(airconsData);
  }, [airconsData]);


  return (
    <>
    <Head>
      <title>TCC | Products</title>
    </Head>
    <ProductNavbar onData={searchAircons} />
      <section id={style.products}>
        <div className={`container ${style.container}`}>
          <div>
            <FilterTab onData={filterAircons} />
            <div className={style.items}>
              <div>
                <p className='body-title'>Products</p>
                <div className={style.item_container}>
                  {aircons.map((aircon) => {
                    return (
                      <Item
                      key={aircon.aircon_id}
                      brand={aircon.brand}
                      model={aircon.model}
                      img={aircon.image_url}
                      price={aircon.price}
                      rating={aircon.star_rating}
                      horsepower={aircon.horsepower} />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

async function getSearchedAircons(data) {
  const { search } = data;

  try {
    let response = await fetch (`/api/get/get_searched_aircons?search=${search}`, {
      method: 'GET'
    })

    if (response.ok) {
      let airconsData = await response.json();
      console.log(airconsData);
      return airconsData;
    } else {
      throw new Error('Something went wrong');
    }

  } catch (err) {
    console.error(err);
    return [];
  }

}

async function getFilteredAircons(data) {

  const { price, type, feature, horsepower, power } = data;

  try {
    let response = await fetch (`/api/get/get_filtered_aircons?min_price=${price[0]}&max_price=${price[1]}&type=${type}&feature=${feature}&horsepower=${horsepower}&min_star=${power[0]}&max_star=${power[1]}`, {
      method: 'GET'
    })

    if (response.ok) {
      let airconsData = await response.json();
      // console.log(airconsData)
      return airconsData;
      // return { props: { airconsData } }
    } else {
      throw new Error('Something went wrong');
    }

  } catch (err) {
    console.error(err);
    return [];
  }

}

export async function getServerSideProps() {
  try {
    let response = await fetch (`${process.env.URL}/api/get/get_aircons`, {
      method: 'GET'
    })

    if (response.ok) {
      let airconsData = await response.json();
      return { props: { airconsData } }
    } else {
      throw new Error('Something went wrong');
    }

  } catch (err) {
    console.error(err);
  }


}
