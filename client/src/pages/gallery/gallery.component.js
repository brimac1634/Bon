import React, { Component } from 'react';

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = { gallery: [] }
	}

	componentDidMount() {
		//fetch gallery images
		fetch('https://graph.facebook.com/v3.2/17841406842055532/media?access_token=EAAG1aNNIuRQBAHpiFePMeH6vqIZAmXkCbH4aG5ykgz8trTBYYoYwWhZAi1EmhP9NrA6IpF0B95dACF0HLq6RQRRkdl66j5ldWG49A8snSZAvyZAWOJHobxZB423WpVaZAdaCacas8ORNRDRo3ZCogAm7SxADI3JY0NS125kOPpmOAZDZD')
		.then(res => res.json())
		.then(data => console.log(data))
	}

	render() {
		return (
			<div className='gallery-page'>
				
			</div>
		)
	}
}

export default Gallery;