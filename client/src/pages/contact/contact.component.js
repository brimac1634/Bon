import React from 'react';

import MapBox from '../../components/map-box/map-box.component';
import ContactForm from '../../components/contact-form/contact-form.component';

import './contact.styles.scss';

const Contact = () => (
	<div className='contact-page'>
		<h1>Contact Bon Vivant</h1>
		<div className='inner-contact'>
			<ContactForm />
			<MapBox />
		</div>
	</div>
)

export default Contact;