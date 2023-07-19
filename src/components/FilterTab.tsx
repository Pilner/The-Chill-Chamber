// @ts-nocheck

import Line from '@/components/Line';
import style from '@/styles/components/FilterTab.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function FilterTab({ onData }) {

	const handleFormSubmit = (event: any) => {
		event.preventDefault();
		const min_price = event.target.min_price.value
		const max_price = event.target.max_price.value
		const type = event.target.type.value
		const feature = event.target.feature.value
		const horsepower = event.target.horsepower.value
		const min_star = event.target.min_star.value
		const max_star = event.target.max_star.value

		console.log(min_price, max_price);

		const filter = {price: [min_price, max_price], type, feature, horsepower, power: [min_star, max_star]};
		onData(filter);
	}

  return (
	  <div className={style.filters}>
		  <form onSubmit={handleFormSubmit}>
			  <div>
				  <p className='body-title'><FontAwesomeIcon icon={faFilter} /> Filter Products</p>
				  <p className='body-text'>Price</p>
				  <div>
					  <input type="number" id="min_price" name="min_price" placeholder='Minimum' min={0}></input>
					  <p>-</p>
					  <input type="number" id="max_price" name="max_price" placeholder='Maximum' min={0}></input>
				  </div>
			  </div>
			  <Line />
			  <div>
				  <p className='body-text'>Air Conditioner Type</p>
				  <div>
					  <input type="radio" value="any" id="any_type" name="type" defaultChecked />
					  <label htmlFor="any_type">Any</label>
				  </div>
				  <div>
					  <input type="radio" value="split" id="split_type" name="type" />
					  <label htmlFor="split_type">Split Type</label>
				  </div>
				  <div>
					  <input type="radio" value="window" id="window_type" name="type" />
					  <label htmlFor="window_type">Window Type</label>
				  </div>
			  </div>
			  <Line />
			  <div>
				  <p className='body-text'>Feature</p>
				  <div>
					  <input type="radio" value="any" id="any_feature" name="feature" defaultChecked />
					  <label htmlFor="any_feature">Any</label>
				  </div>
				  <div>
					  <input type="radio" value="non_inverter" id="non_inverter" name="feature" />
					  <label htmlFor="non_inverter">Non-Inverter</label>
				  </div>
				  <div>
					  <input type="radio" value="inverter" id="inverter" name="feature" />
					  <label htmlFor="inverter">Inverter</label>
				  </div>
			  </div>
			  <Line />
			  <div>
				  <p className='body-text'>Horsepower (HP)</p>
				  <div>
					  <input type="radio" value="any" id="any_hp" name="horsepower" defaultChecked />
					  <label htmlFor="any_hp">Any</label>
				  </div>
				  <div>
					  <input type="radio" value="2.5+" id="hp2.5" name="horsepower" />
					  <label htmlFor="hp2.5">2.5 HP & Above</label>
				  </div>
				  <div>
					  <input type="radio" value="2.0" id="hp2" name="horsepower" />
					  <label htmlFor="hp2">2.0 HP</label>
				  </div>
				  <div>
					  <input type="radio" value="1.5" id="hp1.5" name="horsepower" />
					  <label htmlFor="hp1.5">1.5 HP</label>
				  </div>
				  <div>
					  <input type="radio" value="1.0" id="hp1.0" name="horsepower" />
					  <label htmlFor="hp1.0">1.0 HP</label>
				  </div>
			  </div>
			  <Line />
			  <div>
				  <p className='body-text'>Star Rating</p>
				  <div>
					  <input type="number" id="min-star" name="min_star" placeholder='Minimum' min={0}></input>
					  <p>-</p>
					  <input type="number" id="max-star" name="max_star" placeholder='Maximum' min={0}></input>
				  </div>
			  </div>
			  <div>
				  <button className='round-button' type="submit">
					  Filter
				  </button>
			  </div>
		  </form>
	  </div>

  )
}
