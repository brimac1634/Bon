import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithLoader from '../../components/with-loader/with-loader.component';
import Collection from './collection.component';

const mapStateToProps = createStructuredSelector({
	isLoading: state => !selectIsCollectionsLoaded(state)
})

const CollectionContainer = compose(
	connect(mapStateToProps),
	WithLoader
)(Collection);

export default CollectionContainer;
 
