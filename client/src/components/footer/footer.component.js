import React from 'react';
import './footer.styles.scss';
import { ReactComponent as InstaIcon } from '../../assets/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg'
import { ReactComponent as EmailIcon } from '../../assets/email.svg'

const Footer = ({ horizontal }) => (
	<div className='footer'>
		<div className={`icon-set ${horizontal ? 'horizontal' : 'vertical'}`}>
			<a 
				className='icon'
				href='https://www.instagram.com/bonvivantcollection/' 
				target='_blank' 
				rel='noopener noreferrer'
			>
				<InstaIcon />
			</a>
			<a 
				className='icon'
				href='mailto:info@bonvivantcollection.com?Subject=I%20am%20interested%20in%20Bon%20Vivant!' 
				target='_blank' 
				rel='noopener noreferrer'
			>
				<EmailIcon />
			</a>
			<a 
				className='icon'
				href='https://www.facebook.com/bonvivantcollection/' 
				target='_blank' 
				rel='noopener noreferrer'
			>
				<FacebookIcon />
			</a>
		</div>
	</div>
)

export default Footer;