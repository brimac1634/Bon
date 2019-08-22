import React from 'react';

import BonVLoad from '../../assets/BonVLoad.png'
import './loader.styles.scss';

const Loader = ({ message }) => (
	<div className='loader-overlay'>
		<div className='logo-loader'>
			<img src={BonVLoad} alt='logo' />
			<div className='animation-container'>
				<div className='load-animation' />
			</div>
		</div>
		<h2>{ message }</h2>
	</div>
)

export default Loader;