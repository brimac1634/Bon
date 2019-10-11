import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	collection: selectCollection
})

const CollectionList = ({ collection }) => {
	console.log(collection)

	return (
		<div className='collection-list'>
			{
				collection
				? 	collection.map(item => (
						<CollectionItem key={item.productID} item={item} />
					))
				: 	<span>There are currently no items available</span>
			}
		</div>
	)
}

export default connect(mapStateToProps)(CollectionList);