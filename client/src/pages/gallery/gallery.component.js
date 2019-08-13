import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchGalleryStart } from '../../redux/gallery/gallery.actions';

const mapStateToProps = state => ({
	gallery: state.gallery.gallery
})
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
				
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);