import Image from 'next/image';
import Link from 'next/link';
import style from '@/styles/components/Item.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


interface ItemProps {
  brand: string,
  model: string,
  img: string,
  price: string,
  rating: number
}

export default function Item({brand, model, img, price, rating}: ItemProps) {

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
          <p>{`${brand} ${model}`}</p>
          <p>{`₱${price}`}</p>
          <p>P2,187.5 Monthly</p>
          {stars.map(() => {
            return <FontAwesomeIcon color='gold' icon={faStar} />
          })}
          {noStars.map(() => {
            return <FontAwesomeIcon icon={faStar} />
          })}
        </div>
      </div>
  )
}