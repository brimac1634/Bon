import React, { Component } from 'react';

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = { gallery: [] }
	}

	componentDidMount() {
		//fetch gallery images
		// fetch('graph.facebook.com/6844260068/media')
		// .then(data => console.log(data))
	}

	render() {
		return (
			<div className='gallery-page'>
				
			</div>
		)
	}
}

export default Gallery;