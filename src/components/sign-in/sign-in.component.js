import React, { Component } from 'react';
import './sign-in.styles.scss';
import { withRouter } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils.js';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({email: '', password: ''})
			this.props.history.push('/')
		} catch (error) {
			console.log(error);
		}
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value});
	}

	render() {

		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput 
						name='email' 
						type='email' 
						value={this.state.email} 
						label='email'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						name='password' 
						type='password' 
						value={this.state.password} 
						label='password'
						handleChange={this.handleChange}
						required 
					/>
					<div className='buttons'>
						<CustomButton type='submit'> Sign In </CustomButton>
						<CustomButton 
							isGoogleSignIn={true}
							onClick={signInWithGoogle}
						> 
							Sign In With Google
						</CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default withRouter(SignIn);