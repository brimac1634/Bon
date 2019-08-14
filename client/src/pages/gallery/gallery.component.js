import React, { Component } from 'react';
import { connect } from 'react-redux';

import GalleryItem from '../../components/gallery-item/gallery-item.component';

import { fetchGalleryStart } from '../../redux/gallery/gallery.actions';

import './gallery.styles.scss';

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
		const { gallery } = this.props;
		return (
			<div className='gallery-page'>
				{gallery &&
					gallery.map(({...data}, i) => (
						<GalleryItem key={i} {...data} />
					))
				}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);