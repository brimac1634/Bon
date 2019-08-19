import React from 'react';
import { connect } from 'react-redux';

import { selectProduct } from '../../redux/shop/shop.selectors';

import './product.styles.scss';

const mapStateToProps = (state, ownProps) => ({
	product: selectProduct(ownProps.match.params.productID)(state)
})

const Product = ({ product }) => {
	const { id, name, imageUrls, price, description, features } = product;
	return (
		<div className='product-page'>
			{id}
		</div>
	)
}

export default connect(mapStateToProps)(Product);