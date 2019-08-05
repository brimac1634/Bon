import React from 'react';

import LogoLoader from '../logo-loader/logo-loader.component';

import BonVLoad from '../../assets/BonVLoad.png'
import './with-loader.styles.scss';

const WithLoader = WrappedComponent => ({ isLoading, ...otherProps}) => {
	return isLoading ? (
		<div className='loader-overlay'>
			<div className='logo-loader'>
				<img src={BonVLoad} alt='logo' />
				<div className='animation-container'>
					<div className='load-animation' />
				</div>
			</div>
		</div>
	) : (
		<WrappedComponent { ...otherProps } />
	)
}

export default WithLoader;