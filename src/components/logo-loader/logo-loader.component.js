import React from 'react';

import BonVLoad from '../../assets/BonVLoad.png'
import './logo-loader.styles.scss'

const LogoLoader = () => (
	<div className='logo-loader'>
		<img src={BonVLoad} alt='logo' />
		<div className='animation-container'>
			<div className='load-animation' />
		</div>
	</div>
)

export default LogoLoader;