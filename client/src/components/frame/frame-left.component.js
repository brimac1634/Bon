import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import './frame.styles.scss';

const FrameLeft = () => (
	<div className='bar left-bar'>
		<Link className='logo-container' to={'/'}>
			<Logo className='logo' />
		</Link>
	</div>
)

export default FrameLeft;