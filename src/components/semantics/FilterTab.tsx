import Line from '@/components/Line';
import style from '@/styles/semantics/FilterTab.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function FilterTab() {
  return (
	  <div className={style.filters}>
		  <form method="POST">
			  <div>
				  <p className='body-title'><FontAwesomeIcon icon={faFilter} /> Filter Products</p>
				  <p className='body-text'>Price</p>
				  <div>
					  <input type="number" id="min-price" name="price" placeholder='Minimum'></input>
					  <p>-</p>
					  <input type="number" id="max-price" name="price" placeholder='Maximum'></input>
				  </div>
			  </div>
			  <Line />
			  <div>
				  <p className='body-text'>Air Conditioner Type</p>
				  <div>
					  <input type="radio" value="any" id="any_type" name="type" defaultChecked />
					  <label htmlFor="type">Any</label>
				  </div>
				  <div>
					  <input type="radio" value="split_type" id="split_type" name="type" />
					  <label htmlFor="type">Split Type</label>
				  </div>
				  <div>
					  <input type="radio" value="window_type" id="window_type" name="type" />
					  <label htmlFor="type">Window Type</label>
				  </div>
			  </div>
			  <Line />
			  <div>
				  <p className='body-text'>Feature</p>
				  <div>
					  <input type="radio" value="any" id="any_feature" name="feature" defaultChecked />
					  <label htmlFor="feature">Any</label>
				  </div>
				  <div>
					  <input type="radio" value="non_inverter" id="non_inverter" name="feature" />
					  <label htmlFor="feature">Non-Inverter</label>
				  </div>
				  <div>
					  <input type="radio" value="inverter" id="inverter" name="feature" />
					  <label htmlFor="feature">Inverter</label>
				  </div>
			  </div>
			  <Line />
			  <div>
				  <p className='body-text'>Cooling Capacity (HP)</p>
				  <div>
					  <input type="radio" value="any" id="any_hp" name="horsepower" defaultChecked />
					  <label htmlFor="horsepower">Any</label>
				  </div>
				  <div>
					  <input type="radio" value="2.5+" id="hp2.5" name="horsepower" />
					  <label htmlFor="horsepower">2.5 HP & Above</label>
				  </div>
				  <div>
					  <input type="radio" value="2.0" id="hp2" name="horsepower" />
					  <label htmlFor="horsepower">2.0 HP</label>
				  </div>
				  <div>
					  <input type="radio" value="1.5" id="hp1.5" name="horsepower" />
					  <label htmlFor="horsepower">1.5 HP</label>
				  </div>
				  <div>
					  <input type="radio" value="1.0" id="hp1.0" name="horsepower" />
					  <label htmlFor="horsepower">1.0 HP</label>
				  </div>
			  </div>
			  <Line />
			  <div>
				  <p className='body-text'>Power Consumption (kWh)</p>
				  <div>
					  <input type="number" id="min-power" name="power" placeholder='Minimum'></input>
					  <p>-</p>
					  <input type="number" id="max-power" name="power" placeholder='Maximum'></input>
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
