import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithLoader from '../with-loader/with-loader.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	WithLoader
)(CollectionsOverview);

export default CollectionsOverviewContainer;
 
