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

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg'
import { ReactComponent as EmailIcon } from '../../assets/email.svg'
import { ReactComponent as TwitterIcon } from '../../assets/twitter.svg'
import { ReactComponent as WhatsappIcon } from '../../assets/whatsapp.svg'

import './product-details.styles.scss';

const mapStateToProps = (state, ownProps) => ({
	product: selectProduct(ownProps.match.params.productID)(state)
})

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item))
})

class ProductDetails extends Component {
	state = {
		fade: 'fade-in',
		currentImage: this.props.product.images[0],
		quantity: 1
	}

	componentDidMount() { 
		setTimeout(()=>this.setState({fade: null}), 600) 
	}

	handleChange = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value});
	}

	changeImage = image => {
		this.setState({fade: 'fade-out'})
		setTimeout(()=>{
			this.setState({fade: 'fade-in', currentImage: image})
		}, 400)
		setTimeout(()=>this.setState({fade: null}), 800)
	}

	render() {
		const { fade, currentImage, quantity } = this.state;
		const { 
			addItem,
			product, 
			product: { name, images, price, description, features } 
		} = this.props;

		const currentURL = window.location.href

		return (
			<div className='product-details'>
				<div className='panels'>
					<div className='panel'>
						<div 
							className={`main-image ${fade}`} 
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
										onClick={()=>this.changeImage(image)}
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
							onClick={()=>addItem(product)}
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