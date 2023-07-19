import Image from 'next/image';
import Link from 'next/link';
import style from '@/styles/components/Item.module.css';
import Button, {APIButton} from '@/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  username: string;
}


export default function Item({brand, model, img, price, horsepower, rating}: any) {

  const getterFunction = async (data: boolean) => {
    addToCart(model);
    alert('Item added to cart!');

  }

  let stars = [];
  let noStars = [];
  
  for (let i = 0; i < rating; i++) {
    stars[i] = i+1;
  }
  for (let i = rating; i < 5; i++) {
    noStars[i] = i;
  }


  return (
    <div className={style.item}>
        <div className={style.item_picture}>
        <Link href={`/products/${model}`}>
          <Image
            src={img}
            width={0}
            height={0}
            style={{height: "100%", width: "100%", objectFit: "contain"}}
            unoptimized={true}
            alt="Item Sample"
            />
          </Link>
        </div>
        <div className={style.item_info}>
          <p><b>{`${brand} ${model}`}</b></p>
          <p>{`${horsepower} Horsepowers`}</p>
          <p>{`₱${parseInt(price).toLocaleString(undefined, {minimumFractionDigits: 2})}`}</p>
          {stars.map((star, i) => {
            return <FontAwesomeIcon key={i} color='gold' icon={faStar} />
          })}
          {noStars.map((star, i) => {
            return <FontAwesomeIcon key={i} icon={faStar} />
          })}
          <div className={style.buttonGroup}>
            <Button text='More Info' url={`/products/${model}`} />
            <APIButton text='Add to cart' onData={getterFunction} />
          </div>
        </div>
      </div>
  )
}

async function addToCart(model: any) {
  const session = await getSession();  
  
  // console.log(session);
  const user: User = session?.user as User;
  const username = user.username;
  let data = {model, username};

  try {
    const response = await fetch('/api/post/add_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
    } else if (response.status === 409) {
      throw new Error(responseData);
    } else if (!response.ok) {
      throw new Error(response.statusText);
    }

  } catch(err) {
    console.error(err);
  }
}