import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithLoader from '../../components/with-loader/with-loader.component';

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	isCollectionLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
	fetchCollectionsAsync: () => dispatch(fetchCollectionsAsync())
})

const CollectionOverviewWithLoader = WithLoader(CollectionsOverview);
const CollectionPageWithLoader = WithLoader(CollectionPage);

class ShopPage extends Component {
	componentDidMount() {
		const { fetchCollectionsAsync } = this.props;
		fetchCollectionsAsync();
	}

	render() {
		const { match, isCollectionFetching, isCollectionLoaded } = this.props;
		return (
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithLoader isLoading={isCollectionFetching} {...props} />} />
				<Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithLoader isLoading={!isCollectionLoaded} {...props} />} />
			</div>
		)
	}
} 

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);