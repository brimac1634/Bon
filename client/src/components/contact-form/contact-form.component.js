import React, { Component } from 'react';
import axios from 'axios';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './contact-form.styles.scss';

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: '',
			email: '',
			subject: '',
			message: ''
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		const form = this.state;
		axios({
			url: 'contact-us',
			method: 'post',
			data: form
		}).then(res => {
			console.log('response here', res)
			// this.setState({ 
			// 	fullName: '',
			// 	email: '',
			// 	subject: '',
			// 	message: ''
			// })
		}).catch(err => {
			console.log(err)
		});
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value});
	}

	render() {
		const { fullName, email, subject, message } = this.state;
		return (
			<div className='contact-form'>
				<form onSubmit={this.handleSubmit}>
					<FormInput 
						name='fullName' 
						type='text' 
						value={fullName} 
						label='Full Name'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						name='email' 
						type='email' 
						value={email} 
						label='Email'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						name='subject' 
						type='text' 
						value={subject} 
						label='Subject'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						area
						name='message' 
						type='text' 
						value={message} 
						label='Message'
						handleChange={this.handleChange}
						required 
					/>
					<div className='buttons'>
						<CustomButton type='submit'> Submit </CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default ContactForm;