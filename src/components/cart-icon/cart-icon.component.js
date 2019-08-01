import React from 'react';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount
})

const CartIcon = ({ itemCount }) => (
	<div className='cart-icon'>
		<ShoppingIcon className='shopping-icon' />
		<span className='item-count'>{ itemCount }</span>
	</div>
)

export default connect(mapStateToProps, null)(CartIcon);