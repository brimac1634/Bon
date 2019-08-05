import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithLoader from '../../components/with-loader/with-loader.component';

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

const CollectionOverviewWithLoader = WithLoader(CollectionsOverview);
const CollectionPageWithLoader = WithLoader(CollectionPage);

class ShopPage extends Component {
	state = {
		loading: true
	}

	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');

		collectionRef.onSnapshot(async snapshot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
			updateCollections(collectionsMap)
			this.setState({ loading: false });
		})
	}

	render() {
		const { match } = this.props;
		const { loading } = this.state;
		return (
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithLoader isLoading={loading} {...props} />} />
				<Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithLoader isLoading={loading} {...props} />} />
			</div>
		)
	}
} 

export default connect(null, mapDispatchToProps)(ShopPage);