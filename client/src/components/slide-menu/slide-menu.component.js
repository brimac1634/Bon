import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectMenuState } from '../../redux/menu/menu.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { toggleMenu } from '../../redux/menu/menu.actions';

import Footer from '../footer/footer.component';
import CartIcon from '../cart-icon/cart-icon.component';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import './slide-menu.styles.scss';

const mapStateToProps = createStructuredSelector({
	menuIsOpen: selectMenuState,
	currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
	toggleMenu: () => dispatch(toggleMenu())
})

const SlideMenu = ({ currentUser, history, toggleMenu, menuIsOpen }) => {

	const handleOption = route => {
		toggleMenu()
		history.push(route)
	}

	const menuStyle = menuIsOpen ? 'open-menu' : null;

	return (
		<div className={`slide-menu ${menuStyle}`}>
			<div className='back-arrow' onClick={toggleMenu}>
				<span className='arrow'>&#8594;</span>
			</div>
			<div className='logo' onClick={()=>handleOption('/')}>
				<Logo />
			</div>
			<div className='options'>
				<div className='option-bar'>
					<h2 className='title' onClick={()=>handleOption('/')}>Bon Vivant Collection
					</h2>
					<div 
						onClick={()=>handleOption('/checkout')}
					>
						<CartIcon />
					</div>
				</div>
				<div 
					className='option' 
					onClick={()=>handleOption('/shop')}
				>
					SHOP
				</div>
				<div 
					className='option' 
					onClick={()=>handleOption('/gallery')}
				>
					GALLERY
				</div>
				<div 
					className='option' 
					onClick={()=>handleOption('/philosophy')}
				>
					PHILOSOPHY
				</div>
				<div 
					className='option' 
					onClick={()=>handleOption('/contact')}
				>
					CONTACT
				</div>
				{
					currentUser &&
					<div 
						className='option' 
						onClick={()=>handleOption('/admin')}
					>
						ADMIN
					</div>
				}
			</div>
			<Footer horizontal />
		</div>
	)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SlideMenu));