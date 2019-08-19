import React, { Component } from 'react';
import axios from 'axios';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-product.styles.scss';

class AddProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			price: '',
			quantity: '',
			category: '',
			description: '',
			features: ''
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		const form = this.state;
		axios({
			url: 'add-product',
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
		const { 
			name, 
			price, 
			quantity, 
			category, 
			description, 
			features
		} = this.state;
		const categoryList = ['shorts', 'shirts', 'trousers', 'jackets', 'accessories'];

		return (
			<div className='contact-form'>
				<form onSubmit={this.handleSubmit}>
					<FormInput 
						name='name' 
						type='text' 
						value={name} 
						label='Product Display Name'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						dropList
						list={categoryList}
						name='category'
						value={category} 
						label='Category'
						handleChange={this.handleChange}
					/>
					<FormInput 
						name='price' 
						type='text' 
						value={price} 
						label='Price'
						handleChange={this.handleChange}
					/>
					<FormInput 
						name='quantity' 
						type='text' 
						value={quantity} 
						label='Quantity in Stock'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						name='features' 
						type='text' 
						value={features} 
						label='Product Features'
						handleChange={this.handleChange}
					/>
					<FormInput 
						area
						name='description' 
						type='text' 
						value={description} 
						label='Product Description'
						handleChange={this.handleChange}
					/>
					<div className='buttons'>
						<CustomButton type='submit'> Submit </CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default AddProduct;