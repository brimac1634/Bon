import React from 'react';
import { withRouter } from 'react-router-dom';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem, history, match }) => {
	const { name, price, images, id } = item;
	return (
		<div 
			className='collection-item' 
			onClick={()=>history.push(`${match.url}/${id}`)}
		>
			<div className='inner-container'>
				<div 
					className='image' 
					style={{backgroundImage: `url(${images[0]}`}} 
				/>
				<div className='collection-footer'>
					<span className='name'>{ name }</span>
					<span className='price'>{`HKD$${price}`}</span>
				</div>
			</div>
		</div>
	)
}

export default withRouter(CollectionItem);