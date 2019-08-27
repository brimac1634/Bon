import React from 'react';
import directoryData from './directory.data';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = () => (
	<div className='directory-menu'>
		<h1>SHOP</h1>
		<div className='inner-directory'>
			{directoryData.map(({ id, ...otherSectionProps})=>{
				return (
					<MenuItem
						key={id}
						{...otherSectionProps}
					/>
				)
			})}
		</div>
	</div>
)

export default Directory;