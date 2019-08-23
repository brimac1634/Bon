import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/collection-item.component';
import Product from '../product/product.component';
import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state)
})

const CollectionPage = ({ collection, match }) => {
	console.log(collection)
	const { title, items } = collection;
	return (
		<div>
			<Route 
				exact 
				path={match.path} 
				render={()=>(
					<div className='collection-page'>
						<h2 className='title'>{ title }</h2>
						<div className='items'>
							{
								items.map(item => (
									<CollectionItem key={item.id} item={item} />
								))
							}
						</div>
					</div>
				)}
			/>
			<Route 
				path={`${match.path}/:productID`}
				component={Product}
			/>
		</div>
	)
}

export default connect(mapStateToProps)(CollectionPage);