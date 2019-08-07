import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../collection/collection.container';

const mapDispatchToProps = dispatch => ({
	fetchCollectionsAsync: () => dispatch(fetchCollectionsAsync())
})

class ShopPage extends Component {
	componentDidMount() {
		const { fetchCollectionsAsync } = this.props;
		fetchCollectionsAsync();
	}

	render() {
		const { match } = this.props;
		return (
			<div className='shop-page'>
				<Route 
					exact 
					path={`${match.path}`} 
					component={CollectionsOverviewContainer} 
				/>
				<Route 
					path={`${match.path}/:collectionId`} 
					component={CollectionContainer} 
				/>
			</div>
		)
	}
} 

export default connect(null, mapDispatchToProps)(ShopPage);