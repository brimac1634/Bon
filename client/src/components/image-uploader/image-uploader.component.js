import React, { Component } from 'react';
import axios from 'axios';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Trigger from '../compound/compound-trigger.component';
import Controller from '../compound/compound-controller.component';
import DropList from '../dropdown/drop-list.component';

import './update-collection.styles.scss';

class AddProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productID: '',
			name: '',
			price: '',
			quantity: '',
			category: '',
			description: '',
			features: '',
			images: null
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		const form = this.state;
		let formData = new FormData();
		Object.keys(form).forEach(key => {
			if (key !== 'images') formData.append(key, form[key])
		})
		// productID
		form.images.forEach(image => formData.append('images', image))
		axios({
			url: 'update-collection',
			method: 'POST',
			headers: { 'content-type': 'multipart/form-data' },
			data: formData
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

	handleChange = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value});
	}

	categorySelect = category => {
		this.setState({ category })
	}

	handleChangeFile = e => {
		const files = e.target.files;
		let fileArray = [];
		for (let i = 0; i < files.length; i++) {
			fileArray.push(files[i])
		}
		this.setState({ images: fileArray })
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
				<h1>Upload Images</h1>
				<form onSubmit={this.handleSubmit}>
					<input 
						type='file' 
						accept='image/*'
						multiple='multiple' 
						name='image' 
						onChange={this.handleChangeFile} 
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