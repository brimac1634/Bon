import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	collection: selectCollection
})

const CollectionList = ({ collection }) => (
	<div className='collection-list'>
		{
			collection &&
			collection.map(item => (
				<CollectionItem key={item.id} item={item} />
			))
		}
	</div>
)

export default connect(mapStateToProps)(CollectionList);