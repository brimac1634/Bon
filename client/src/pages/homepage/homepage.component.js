import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import ParallaxRow from '../../components/parallax-row/parallax-row.component';
import Directory from '../../components/directory/directory.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import itemTrans from '../../assets/item1-trans.png';
import fern from '../../assets/fern.jpg';
import needle from '../../assets/needle.png'
import scissors from '../../assets/scissors.png'
import frontDoor from '../../assets/front_door.jpg';
import './homepage.styles.scss';

class HomePage extends Component {
	constructor() {
		super();
		this.state = { email: '' };
	}

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

		return (
			<div className='homepage'>
				<ParallaxRow background={`url(${fern})`} height='600px'>
					<div className='hero-content'>
						<Fade bottom>
							<img src={itemTrans} alt='bust'/>
							<div className='title-container'>
								<h1 className='title'>Bon Vivant</h1>
								<h1 className='title'>Collection</h1>
							</div>
						</Fade>
					</div>
				</ParallaxRow>
				<div className='row grey'>
					<div className='col'>
						<Fade bottom>
							<img className='illustration' src={needle} alt='needle' />
							<h1 className='center with-border'>
								Men's Haberdashery specialising in handmade tailored clothing for those who live well.
							</h1>
						</Fade>
					</div>
				</div>
				<div className='row'>
					<Directory />
				</div>
				<div className='row grey'>
					<div className='col'>
						<Fade bottom>
							<img className='scissors' src={scissors} alt='needle' />
							<p className='text center with-border'>
								Bon Vivant is an idea of appreciation - that there exists an intrinsic value to things that give joy in life. These works consist of ideas and memories that bear a connection to the past. What was before considered dated has been transmuted by the mere passing of years to a status at once modern and prevalent.
							</p>
						</Fade>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<img className='front-door' src={frontDoor} alt='front door' />
					</div>
					<div className='col'>
						<h1 className='center'>
							keep up to date with special offers
						</h1>
						<form onSubmit={this.handleSubmit}>
							<FormInput 
								name='email' 
								type='email' 
								value={this.state.email} 
								label='email'
								handleChange={this.handleChange}
								required 
							/>
							<CustomButton type='submit'> Sign Up </CustomButton>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default HomePage;