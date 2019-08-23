import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectProduct } from '../../redux/shop/shop.selectors';
import { addItem } from '../../redux/cart/cart.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './product-details.styles.scss';

const mapStateToProps = (state, ownProps) => ({
	product: selectProduct(ownProps.match.params.productID)(state)
})

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item))
})

class ProductDetails extends Component {
	state = {
		currentImage: this.props.product.images[0],
		quantity: 1
	}

	handleChange = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value});
	}

	render() {
		const { currentImage, quantity } = this.state;
		const { 
			addItem,
			product, 
			product: { id, name, images, price, description, features } 
		} = this.props;

		return (
			<div className='product-details'>
				<div className='panels'>
					<div className='panel'>
						<div 
							className='main-image' 
							style={{backgroundImage: `url(${currentImage})`}} 
						/>
						<div className='image-list'>
							{
								images &&
								images.map((image, i) => (
									<div 
										key={i}
										className='list-image' 
										style={{backgroundImage: `url(${image})`}} 
										onClick={()=>this.setState({currentImage: image})}
									/>
								))
							}
						</div>
					</div>
					<div className='panel'>
						<h2>{ name }</h2>
						<span className='price'>{ `HKD$${price}` }</span>
						<FormInput 
							name='quantity' 
							type='number'
							value={quantity} 
							label='Quantity'
							handleChange={this.handleChange}
						/>
						<CustomButton 
							onClick={()=>addItem(product)}
						> 
							Add to Cart
						</CustomButton>
						<p>{ description }</p>
						{
							features &&
							features.map((feature, i) => (
								<span key={i}>&#8226;{` ${feature}`}</span>
							))
						}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));