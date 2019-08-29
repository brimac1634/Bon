import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart } from '../../redux/cart/cart.actions';

import './cart-item.styles.scss';

const mapDispatchToProps = dispatch => ({
	clearItem: item => dispatch(clearItemFromCart(item))
})


const CartItem = ({ clearItem, item, item: { images, price, name, quantity } }) => (
	<div className='cart-item'>
		<img src={images[0]} alt='item' />
		<div className='item-details'>
			<span className='name'>{ name }</span>
			<span className='price'>
				{ quantity } x HKD${ price }
			</span>
		</div>
		<div 
			className='remove-button' 
			onClick={()=>clearItem(item)}
		>
			&#10005;
		</div>
	</div>
)

export default connect(null, mapDispatchToProps)(CartItem);