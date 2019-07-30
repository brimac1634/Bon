import React from 'react';
import './footer.styles.scss';
import { ReactComponent as InstaIcon } from '../../assets/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg'
import { ReactComponent as EmailIcon } from '../../assets/email.svg'

const Footer = () => (
	<div className='footer'>
		<div className='icon-set'>
			<div className='icon' >
				<InstaIcon />
			</div>
			<div className='icon' >
				<EmailIcon />
			</div>
			<div className='icon' >
				<FacebookIcon />
			</div>
		</div>
	</div>
)

export default Footer;