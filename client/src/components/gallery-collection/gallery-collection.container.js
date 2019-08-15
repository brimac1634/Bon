import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import WithLoader from '../with-loader/with-loader.component';
import GalleryCollection from './gallery-collection.component';

import { selectGalleryIsLoaded } from '../../redux/gallery/gallery.selectors';

const mapStateToProps = createStructuredSelector({
	isLoading: state => !selectGalleryIsLoaded(state)
})

const GalleryContainer = compose(
	connect(mapStateToProps),
	WithLoader
)(GalleryCollection);

export default GalleryContainer;