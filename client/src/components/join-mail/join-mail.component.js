import React, { Component } from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './join-mail.styles.scss';

class JoinMail extends Component {
	state = { email: '' };

	handleSubmit = async event => {
		event.preventDefault();
		// const { email } = this.state;
		//sign up for special offer
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value })
	}

    render() {
    	const { email } = this.state;
    	return (
    		<div className='join-mail'>
				<h1>
					keep up to date with special offers
				</h1>
				<form className='form' onSubmit={this.handleSubmit}>
					<FormInput 
						name='email' 
						type='email' 
						value={email} 
						label='email'
						handleChange={this.handleChange}
						required 
					/>
					<CustomButton type='submit'> Sign Up </CustomButton>
				</form>
			</div>
    	)
    }
}

export default JoinMail;