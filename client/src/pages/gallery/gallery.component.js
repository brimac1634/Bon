import React, { Component } from 'react';
import { connect } from 'react-redux';

import GalleryContainer from '../../components/gallery-collection/gallery-collection.container';

import { fetchGalleryStart } from '../../redux/gallery/gallery.actions';

const mapDispatchToProps = dispatch => ({
	fetchGalleryStart: () => dispatch(fetchGalleryStart())
})

class Gallery extends Component {
	componentDidMount() {
		const { fetchGalleryStart } = this.props;
		fetchGalleryStart()
	}

	render() {
		return (
			<div className='gallery-page'>
				<GalleryContainer />
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(Gallery);