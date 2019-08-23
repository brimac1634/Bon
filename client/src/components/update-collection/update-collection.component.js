import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { startLoading, stopLoading } from '../../redux/loading/loading.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Trigger from '../compound/compound-trigger.component';
import Controller from '../compound/compound-controller.component';
import DropList from '../dropdown/drop-list.component';

import './update-collection.styles.scss';

const mapDispatchToProps = dispatch => ({
	startLoading: message => dispatch(startLoading(message)),
	stopLoading: () => dispatch(stopLoading())
})

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
			featuresField: '',
			features: null,
			images: null
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { startLoading, stopLoading } = this.props;
		startLoading('Updating Collection...')
		const form = this.state;
		axios.post('update-collection', form)
			.then(({ data }) => {
				if (form.images) {
					this.uploadImages(data[0].id)
				} else {
					stopLoading()
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	uploadImages = async productID => {
		const { startLoading, stopLoading } = this.props;
		startLoading('Uploading Images...')
		const { images } = this.state;
		let formData = new FormData();
		images.forEach(image => formData.append('images', image))
		formData.append('productID', productID)
		axios({
			url: 'update-collection-images',
			method: 'POST',
			headers: { 'content-type': 'multipart/form-data' },
			data: formData
		}).then(({ data }) => {
			stopLoading()
			console.log('response here', data)
			this.setState({ 
				productID: '',
				name: '',
				price: '',
				quantity: '',
				category: '',
				description: '',
				features: null,
				images: null
			})
		}).catch(err => {
			console.log(err)
			stopLoading()
		});
	}

	handleChange = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value});
	}

	handleAddFeatures = e => {
		if (e.which === 13) {
			e.preventDefault();
			const { value } = e.target;
			let { features } = this.state;
			features = features ? [...features, value] : [value]
			this.setState({ features, featuresField: '' })
		}
	}


	categorySelect = category => {
		this.setState({ category })
	}

	handleChangeFile = e => {
		let { images } = this.state;
		const files = e.target.files;
		let fileArray = [];
		for (let i = 0; i < files.length; i++) {
			fileArray.push(files[i])
		}
		images = images ? images.concat(fileArray) : fileArray
		this.setState({ images })
	}

	removeFromArray = (list, index) => {
		let array  = this.state[list];
		array.splice(index, 1);
		this.setState({ [list]: array })
	}

	render() {
		const { 
			name, 
			price, 
			quantity, 
			category, 
			description, 
			featuresField,
			features,
			images
		} = this.state;
		const categoryList = ['shorts', 'shirts', 'trousers', 'jackets', 'accessories'];

		return (
			<div className='update-collection'>
				<form onSubmit={this.handleSubmit}>
					<div className='panels'>
						<div className='panel'>
							<FormInput 
								name='name' 
								type='text' 
								value={name} 
								label='Product Display Name'
								handleChange={this.handleChange}
								required 
							/>
							<Controller>
								<Trigger>
									<div>
										<FormInput 
											disabled
											value={category} 
											label='Category'
										/>
									</div>
								</Trigger>
								<DropList
									list={categoryList} 
									handleSelection={this.categorySelect}
								/>
							</Controller>
							<FormInput 
								name='price' 
								type='number' 
								value={price} 
								label='Price (HKD)'
								handleChange={this.handleChange}
							/>
							<FormInput 
								name='quantity' 
								type='number' 
								value={quantity} 
								label='Quantity in Stock'
								handleChange={this.handleChange}
								required 
							/>
							<FormInput 
								name='featuresField' 
								type='text' 
								value={featuresField} 
								label='Add Product Features'
								handleChange={this.handleChange}
								onKeyPress={this.handleAddFeatures}
							/>
							{
								features &&
								<div>
									<span className='feature-label'>Features:</span>
									<div className='features'>
										{
											features.map((feature, i) => (
												<div 
													className='feature' 
													key={i}
													onClick={()=>this.removeFromArray('features', i)}
												>
														{feature} &#10005;
												</div>
											))
										}
									</div>
								</div>
							}
							<FormInput 
								area
								name='description' 
								type='text' 
								value={description} 
								label='Product Description'
								handleChange={this.handleChange}
							/>
						</div>
						<div className='panel image-panel'>
							<span className='image-header'>
								Add or Remove Images
							</span>
							<input 
								className='input-file'
								type='file' 
								accept='image/png, image/jpeg'
								multiple='multiple' 
								name='image'
								id='upload' 
								onChange={this.handleChangeFile} 
							/>
							<label htmlFor='upload'>Choose Images</label>
							<div className='image-collection'>
								{
									images &&
									images.map((image, i) => (
										<div className='image' key={i}>
											<img 
												src={URL.createObjectURL(image)}
												alt={image.name}
											/>
											<span className='img-label'>{image.name}</span>
											<div 
												className='x'
												onClick={()=>this.removeFromArray('images', i)}
											>
												<span>&#10005;</span>
											</div>
										</div>
									))
								}
							</div>
						</div>
					</div>
					<div className='buttons'>
						<CustomButton type='submit'> Submit </CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(AddProduct);