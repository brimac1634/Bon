import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailShareButton 
} from 'react-share';

import { selectProduct } from '../../redux/shop/shop.selectors';
import { addItem } from '../../redux/cart/cart.actions';
import { setAlert } from '../../redux/alert/alert.actions'; 

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import HoverZoom from '../hover-zoom/hover-zoom.component';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg'
import { ReactComponent as EmailIcon } from '../../assets/email.svg'
import { ReactComponent as TwitterIcon } from '../../assets/twitter.svg'
import { ReactComponent as WhatsappIcon } from '../../assets/whatsapp.svg'

import './product-details.styles.scss';

const mapStateToProps = (state, ownProps) => ({
	product: selectProduct(ownProps.match.params.productID)(state)
})

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item)),
	setAlert: message => dispatch(setAlert(message))
})

class ProductDetails extends Component {
	state = {
		currentImage: this.props.product.images[0],
		quantity: 1
	}

	componentDidMount() { 
		setTimeout(()=>this.setState({fade: null}), 600) 
	}

	handleChange = e => {
		const { value, name } = e.target;
		this.setState({ [name]: Number(value)});
	}

	addItemToCart = (item, quantity) => {
		const { addItem, setAlert } = this.props;
		addItem({ item, quantity });
		setAlert('Added to Cart');
	}

	render() {
		const { currentImage, quantity } = this.state;
		const { 
			product, 
			product: { name, images, price, description, features } 
		} = this.props;

		const currentURL = window.location.href

		return (
			<div className='product-details'>
				<div className='panels'>
					<div className='panel'>
						<HoverZoom 
							src={currentImage} 
							alt='product image' 
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
						<h1>{ name }</h1>
						<span className='price'>{ `HKD$${price}` }</span>
						<FormInput 
							name='quantity' 
							type='number'
							value={quantity} 
							label='Quantity'
							handleChange={this.handleChange}
						/>
						<CustomButton 
							onClick={()=>this.addItemToCart(product, quantity)}
						> 
							Add to Cart
						</CustomButton>
						<p className='description'>{ description }</p>
						{
							features &&
							features.map((feature, i) => (
								<div key={i} className='feature'>
									<span >&#8226;</span>
									<span>{ feature }</span>
								</div>
							))
						}
						<div className='share'>
							<span>Share:</span>
							<div className='share-buttons'>
								<FacebookShareButton 
									url={currentURL} 
									hashtag='#bonvivantcollection'
								>
									<div className='icon'>
										<FacebookIcon />
									</div>
								</FacebookShareButton>
								<TwitterShareButton 
									url={currentURL}
									hashtags={['bonvivantcollection']} 
								>
									<div className='icon'>
										<TwitterIcon />
									</div>
								</TwitterShareButton>
								<WhatsappShareButton 
									url={currentURL}
									title='Bon Vivant Collection'
								>
									<div className='icon'>
										<WhatsappIcon />
									</div>
								</WhatsappShareButton>
								<EmailShareButton 
									url={currentURL}
									subject={`Bon Vivant Collection - ${name}`}
								>
									<div className='icon'>
										<EmailIcon />
									</div>
								</EmailShareButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));