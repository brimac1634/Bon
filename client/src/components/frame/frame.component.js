import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { selectCurrentUser } from '../../redux/user/user.selectors';

import CartIcon from '../cart-icon/cart-icon.component';
import Trigger from '../dropdown/dropdown-trigger.component';
import Controller from '../dropdown/dropdown-controller.component';
import Dropdown from '../dropdown/dropdown.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import Footer from '../footer/footer.component';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import './frame.styles.scss';

const mapStateToProps = state => ({
	currentUser: selectCurrentUser(state)
})

const Frame = ({ currentUser, children }) => (
	<div className='frame'>
		<div className='bar top-bar'>
			<Link className='title' to={'/'}>Bon Vivant Collection</Link>
			<div className='options'>
				<Link className='option' to={'/shop'}>
					SHOP
				</Link>
				<Link className='option' to={'/gallery'}>
					GALLERY
				</Link>
				<Link className='option' to={'/philosophy'}>
					PHILOSOPHY
				</Link>
				<Link className='option' to={'/contact'}>
					CONTACT
				</Link>
				{
					currentUser &&
					<Link className='option' to={'/admin'}>
						ADMIN
					</Link>
				}
				<Controller>
					<Trigger>
						<div>
							<CartIcon />
						</div>
					</Trigger>
					<Dropdown>
						<CartDropdown />
					</Dropdown>
				</Controller>
			</div>
		</div>
		<div className='bar left-bar'>
			<Link className='logo-container' to={'/'}>
				<Logo className='logo' />
			</Link>
		</div>
		<div className='bar right-bar'>
			<Footer />
		</div>
		<div className='bar bottom-bar'>
			<span className='scroll bob'>&#8595;</span>
			<span className='scroll'>scroll</span>
			<span className='scroll bob'>&#8595;</span>
		</div>
		<div className='middle'>
			{children}
		</div>
	</div>
)

export default connect(mapStateToProps)(Frame);