import React from 'react';
import { Route } from 'react-router-dom';

import CollectionList from '../../components/collection-list/collection-list.component';
import Product from '../product/product.component';

import './collection.styles.scss';

const CollectionPage = ({ match }) => {
	return (
		<div>
			<Route 
				exact 
				path={match.path} 
				render={()=>(
					<div className='collection-page'>
						<h2 className='title'>Online Shop</h2>
						<CollectionList />
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

export default CollectionPage;