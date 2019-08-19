import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive'; 

import { selectCurrentUser } from '../../redux/user/user.selectors';

import CartIcon from '../cart-icon/cart-icon.component';
import Trigger from '../compound/compound-trigger.component';
import Controller from '../compound/compound-controller.component';
import DropComponent from '../dropdown/drop-component.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './frame.styles.scss';

const mapStateToProps = state => ({
	currentUser: selectCurrentUser(state)
})

const FrameTop = ({ currentUser }) => (
	<div className='bar top-bar'>
		<Link className='title' to={'/'}>Bon Vivant Collection</Link>
		<div className='options'>
			<MediaQuery minWidth={730}>
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
			</MediaQuery>
			<Controller>
				<Trigger>
					<div>
						<CartIcon />
					</div>
				</Trigger>
				<DropComponent>
					<CartDropdown />
				</DropComponent>
			</Controller>
			<MediaQuery minWidth={730}>
				<div className='hamburger' onClick={} />
			</MediaQuery>
		</div>
	</div>
)

export default connect(mapStateToProps)(FrameTop);