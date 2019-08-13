import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item))
})

const CollectionItem = ({ item, addItem }) => {
	const { name, price, imageUrl } = item;
	return (
		<div className='collection-item'>
			<div className='image' style={{backgroundImage: `url(${imageUrl}`}}/>
			<div className='collection-footer'>
				<span className='name'>{ name }</span>
				<span className='price'>{`HKD$${price}`}</span>
			</div>
			<CustomButton 
				inverted
				onClick={()=>addItem(item)}
			> 
				Add to cart 
			</CustomButton>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(CollectionItem);