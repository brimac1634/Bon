import React from 'react';
import './header.styles.scss';
import { connect } from 'react-redux'; 
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import Trigger from '../dropdown/dropdown.trigger.component';
import Controller from '../dropdown/dropdown.controller.component';
import Dropdown from '../dropdown/dropdown.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
})

const Header = ({ currentUser }) => (
	<div className='header'>
		<Link className='logo-container' to={'/'}>
			<Logo className='logo' />
		</Link>
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
				currentUser ?
				<div className='option' onClick={()=>auth.signOut()}>
					SIGN OUT
				</div>
				:
				<Link className='option' to='/signin'>SIGN IN</Link>
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
)

export default connect(mapStateToProps, null)(Header);