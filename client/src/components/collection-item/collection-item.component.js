import React from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem, history, match }) => {
	const { name, price, imageUrls, id } = item;

	return (
		<div className='collection-item'>
			<div className='image' style={{backgroundImage: `url(${imageUrls[0]}`}}/>
			<div className='collection-footer'>
				<span className='name'>{ name }</span>
				<span className='price'>{`HKD$${price}`}</span>
			</div>
			<CustomButton 
				inverted
				onClick={()=>history.push(`${match.url}/${id}`)}
			> 
				View Details 
			</CustomButton>
		</div>
	)
}

export default withRouter(CollectionItem);