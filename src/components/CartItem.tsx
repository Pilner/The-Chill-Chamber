import Image from 'next/image';
import Link from 'next/link';
import style from '@/styles/components/CartItem.module.css';

export default function CartItem({item, onData}: any) {

	const handleClick = () => {
		onData(item.model);
	}

  return (
	<div className={style.item}>
		<div className={style.picture}>
			<div>
				<Link href={`/products/${item.model}`}>
					<Image
						src={item.image_url}
						width={0}
						height={0}
						style={{height: "100%", width: "100%", objectFit: "contain"}}
						alt='Item Sample'
						unoptimized={true}
					/>
				</Link>
			</div>
		</div>
		<div className={style.model}>
			<div>
				<p className='body-text'>
					{item.model}
				</p>
			</div>
		</div>
		<div className={style.brand}>
			<div>
				<p className="body-text">
					{item.brand}
				</p>
			</div>
		</div>
		<div className={style.price}>
			<div>
				<p className="body-text">
					₱{parseInt(item.price).toLocaleString(undefined, {minimumFractionDigits: 2})}
				</p>
			</div>
		</div>
		<div className={style.quantity}>
			<div>
				<p className='body-text'>
					{item.quantity}
				</p>
			</div>
		</div>
		<div className={style.totalPrice}>
			<div>
				<p className="body-text">
					₱{(parseInt(item.price) * parseInt(item.quantity)).toLocaleString(undefined, {minimumFractionDigits: 2})}
				</p>
			</div>
		</div>
		<div className={style.delete}>
			<div>
				<p className="body-text">
					<button className='round-button' onClick={handleClick}>X</button>
				</p>
			</div>
		</div>
	</div>
  )
}
